import cv2
import numpy as np
from PIL import Image
import os
from dotenv import load_dotenv
from pathlib import Path
import pandas as pd

load_dotenv()

FOLDER = os.environ['FOLDER']
path = Path(FOLDER) / 'training'

samples = []
names = []
ids = []

detector = cv2.CascadeClassifier("./haarcascade_frontalface_default.xml")

for id, dir in enumerate(path.iterdir()):
    person = str(dir.name)
    files = list(dir.iterdir())

    if len(files) < 5:
        continue

    for file in files:
        image = cv2.cvtColor(cv2.imread(str(file)), cv2.COLOR_BGR2GRAY) 
        face = detector.detectMultiScale(image, 1.2, 6)

        if len(face) == 1:
            for (x,y,w,h) in face:
                samples.append(image[y:y+h,x:x+w])
                ids.append(id)
                names.append(person)

recognizer = cv2.face.LBPHFaceRecognizer_create() 
recognizer.train(samples, np.array(ids))
recognizer.save('trainer.yml')

labels = pd.DataFrame(np.column_stack((ids, names))).drop_duplicates()
labels.to_csv('labels.csv', index=False, header=False)
