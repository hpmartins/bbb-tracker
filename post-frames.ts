import "dotenv/config";
import fs from "fs";
import axios from "axios";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// @ts-ignore
import * as m3u8Parser from "m3u8-parser";
import m3u8stream from "m3u8stream";
import ffmpeg from "fluent-ffmpeg";
import { AppBskyEmbedImages, AppBskyFeedPost, BskyAgent, RichText } from "@atproto/api";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = 'America/Sao_Paulo';

const FOLDER = process.env.FOLDER ?? "./";
const agent = new BskyAgent({
  service: "https://bsky.social/",
});

const run = async () => {
  await agent.login({
    identifier: process.env.BSKY_DID ?? "",
    password: process.env.BSKY_PWD ?? "",
  });

  const ts = dayjs().valueOf();
  const video_ids = ["244881", "772202"];

  const files: string[] = [];

  const promises = [];
  for (const video_id of video_ids) {
    const data = await axios({
      method: "POST",
      url: `http://playback.video.globo.com/v4/video-session`,
      headers: {
        Authorization: `Bearer ${process.env.GLBID}`,
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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

    const file1 = `${FOLDER}/${ts}_${video_id}_1.jpg`;
    const file2 = `${FOLDER}/${ts}_${video_id}_2.jpg`;
    files.push(file1, file2);

    promises.push(
      new Promise<void>((resolve, reject) => {
        ffmpeg()
          .input(stream)
          .noAudio()
          .outputOptions('-qscale:v 2')
          .output(file1)
          .frames(1)
          .outputOptions('-qscale:v 2')
          .output(file2)
          .seek(60)
          .frames(1)
          .on("progress", (progress) => {
            console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
          })
          .on("error", (err) => {
            console.log(`[ffmpeg] error: ${err.message}`);
            reject(err);
          })
          .on("end", () => {
            console.log("[ffmpeg] finished");
            resolve();
          })
          .run();
      })
    );
  }

  Promise.all(promises).then(async () => {
    files.map((f) => {
      const stats = fs.statSync(f);
      var fileSizeInBytes = stats.size;
      // Convert the file size to megabytes (optional)
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      console.log(fileSizeInMegabytes);
    });
    
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const img = fs.readFileSync(file);
        const uploaded = await agent.uploadBlob(img, {
          encoding: "image/jpeg",
        });
        if (!uploaded.success) throw new Error("Failed to upload image");

        return {
          image: uploaded.data.blob,
          alt: "#bbb24",
        } satisfies AppBskyEmbedImages.Image;
      })
    );

    const embed =
      uploadedImages.length > 0
        ? {
            $type: "app.bsky.embed.images",
            images: uploadedImages,
          }
        : undefined;

    if (embed) {
      const timeStr = dayjs().tz(TIMEZONE).format('DD/MM HH:mm')

      const rt = new RichText({
        text: `${timeStr} #bbb24`,
      })
      await rt.detectFacets(agent);

      const postRecord = {
        $type: "app.bsky.feed.post",
        text: rt.text,
        facets: rt.facets,
        langs: ['pt'],
        embed: embed,
        createdAt: new Date().toISOString(),
      };
  
      if (
        AppBskyFeedPost.isRecord(postRecord) &&
        AppBskyFeedPost.validateRecord(postRecord).success
      ) {
        await agent.post(postRecord);
      }
    }

  });
};

run();
