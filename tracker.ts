import "dotenv/config";
import fs from "fs";
import axios from "axios";
import dayjs from "dayjs";
// @ts-ignore
import * as m3u8Parser from "m3u8-parser";
import m3u8stream from "m3u8stream";
import ffmpeg from "fluent-ffmpeg";

const FOLDER = process.env.FOLDER ?? "./";

const run = async () => {

  const ts = dayjs().valueOf();
  const video_id = "244881";
  const promises = [];

  const data = await axios({
    method: "POST",
    url: `https://playback.video.globo.com/v4/video-session`,
    headers: {
      Authorization: `Bearer ${process.env.GLBID}`,
    },
    data: {
      player_type: "desktop",
      video_id: video_id,
      quality: "max",
      ts: dayjs().subtract(2, "minute").valueOf(),
      content_protection: "widevine",
      flt: true,
    },
  }).then((res) => res.data.sources[0]);

  const parser = new m3u8Parser.Parser();
  parser.push(await axios.get(data.url).then((res) => res.data));
  parser.end();

  const split_url = data.url.split("/");
  split_url[split_url.length - 1] = parser.manifest.playlists[7].uri;
  const stream_url = split_url.join("/");

  const stream = m3u8stream(stream_url);

  const file = `${FOLDER}/trk_${ts}_${video_id}.jpg`;

  const promise = new Promise<string>((resolve, reject) => {
    ffmpeg()
      .input(stream)
      .noAudio()
      .frames(1)
      .output(file)
      .on("progress", (progress) => {
        console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
      })
      .on("error", (err) => {
        console.log(`[ffmpeg] error: ${err.message}`);
        reject(err);
      })
      .on("end", () => {
        console.log("[ffmpeg] finished");
        resolve(file);
      })
      .run();
  });
};

run();
