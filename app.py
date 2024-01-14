from flask import Flask, Response
import cv2
from dotenv import load_dotenv
import requests
import os
import time
import m3u8
import subprocess
import numpy
from pathlib import Path
import random
import pandas as pd
import arrow

load_dotenv()

VIDEO_SESSION_URL = "http://playback.video.globo.com/v4/video-session"
GLBID = os.environ["GLBID"]
FOLDER = os.environ["FOLDER"]
FPS = 1

LABELS = pd.read_csv("labels.csv", header=None, index_col=0, names=["person"])


recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("trainer.yml")
font = cv2.FONT_HERSHEY_SIMPLEX
detector = cv2.CascadeClassifier("./haarcascade_frontalface_default.xml")

app = Flask(__name__)

def read_video():
    r = requests.post(
        url=VIDEO_SESSION_URL,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": f"Bearer {GLBID}",
        },
        json={
            "player_type": "desktop",
            "video_id": "244881",
            "quality": "max",
            "content_protection": "widevine",
            "flt": True,
        },
    )
    data = r.json()["sources"][0]

    url = data["url"]

    parsed = m3u8.load(url)

    playlist = parsed.playlists[5]

    split_url = url.split("/")
    split_url[-1] = playlist.uri
    stream_url = "/".join(split_url)

    # resolution = playlist.resolution
    width, height = playlist.stream_info.resolution

    pipe = subprocess.Popen(
        [
            "ffmpeg",
            "-r",
            "30",
            "-i",
            stream_url,
            "-an",
            "-f",
            "image2pipe",
            "-pix_fmt",
            "bgr24",
            "-vcodec",
            "rawvideo",
            "-r",
            f"{FPS}",
            "-",
        ],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
    )

    detector = cv2.CascadeClassifier("./haarcascade_frontalface_default.xml")

    checkpoint = 0

    while True:
        raw_image = pipe.stdout.read(width * height * 3)
        img = numpy.frombuffer(raw_image, dtype="uint8").reshape((height, width, 3))
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = detector.detectMultiScale(img, 1.2, 6)

        ts = arrow.now().timestamp()

        newImg = numpy.array(img)
        for x, y, w, h in faces:
            # if len(faces) == 1 and w > width / 20 and w < width / 5 and ts > checkpoint:
            #     checkpoint = arrow.now().shift(minutes=1).timestamp()
            #     cv2.imwrite(f"{FOLDER}/{ts}.jpg", newImg)
            cv2.rectangle(newImg, (x, y), (x + w, y + h), (0, 255, 0), 3)
            id, confidence = recognizer.predict(gray[y : y + h, x : x + w])
            if confidence < 100:
                id = LABELS.loc[id]['person']
                confidence = "  {0}%".format(round(100 - confidence))
            else:
                id = "Unknown"
                confidence = "  {0}%".format(round(100 - confidence))
            cv2.putText(
                newImg, str(id) + confidence, (x + 5, y - 5), font, 1, (255, 255, 255), 2
            )

        _, buffer = cv2.imencode(".jpg", newImg)
        frame = buffer.tobytes()
        time.sleep(1 / FPS)
        yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")


def read_img():

    files = (Path(FOLDER) / "training").glob("**/*.jpg")

    frame = cv2.imread(random.choice([str(x) for x in files]))
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = detector.detectMultiScale(frame, 1.2, 6)
    for x, y, w, h in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)
        id, confidence = recognizer.predict(gray[y : y + h, x : x + w])
        if confidence < 100:
            id = LABELS.loc[id]['person']
            confidence = "  {0}%".format(round(100 - confidence))
        else:
            id = "Unknown"
            confidence = "  {0}%".format(round(100 - confidence))
        cv2.putText(
            frame, str(id) + confidence, (x + 5, y - 5), font, 1, (255, 255, 255), 2
        )

    _, buffer = cv2.imencode(".jpg", frame)
    return buffer.tobytes()


@app.route("/video")
def video():
    return Response(read_video(), mimetype="multipart/x-mixed-replace; boundary=frame")


@app.route("/")
def index():
    return Response(read_img(), mimetype="image/jpeg")


if __name__ == "__main__":
    app.run(debug=True, port=8000)
