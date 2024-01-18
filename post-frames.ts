import 'dotenv/config';
var cron = require('node-cron');
import fs from 'fs';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// @ts-ignore
import * as m3u8Parser from 'm3u8-parser';
import m3u8stream from 'm3u8stream';
import ffmpeg from 'fluent-ffmpeg';
import { AppBskyEmbedImages, AppBskyFeedPost, BskyAgent, RichText } from '@atproto/api';
import Jimp from 'jimp';

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = 'America/Sao_Paulo';

const FOLDER = process.env.FOLDER ?? './';
const agent = new BskyAgent({
    service: 'https://bsky.social/'
});

const log = (text: string) => {
    console.log(`[${new Date().toLocaleTimeString()}] [bbb-post-frames] ${text}`);
};

const scheduleTasks = () => {
    cron.schedule('0,10,20,30,40,50 * * * *', async () => {
        log('postando...');
        await postFrames();
    });
};

const getFrames = async (video_id: string) => {
    const ts = dayjs().valueOf();
    
    const data = await axios({
        method: 'POST',
        url: `http://playback.video.globo.com/v4/video-session`,
        headers: {
            Authorization: `Bearer ${process.env.GLBID}`,
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        data: {
            player_type: 'desktop',
            video_id: video_id,
            quality: 'max',
            ts: dayjs().subtract(1, 'minute').valueOf(),
            content_protection: 'widevine',
            flt: true
        }
    }).then((res) => res.data.sources[0]);

    const parser = new m3u8Parser.Parser();
    const m3u8playlist = await axios.get(data.url).then((res) => res.data)
    parser.push(m3u8playlist);
    parser.end();

    const split_url = data.url.split('/');
    split_url[split_url.length - 1] = parser.manifest.playlists[7].uri;
    const stream_url = split_url.join('/');
    const stream = m3u8stream(stream_url);

    const file1 = `${FOLDER}/${ts}_${video_id}_1.jpg`;
    const file2 = `${FOLDER}/${ts}_${video_id}_2.jpg`;

    const promise = new Promise<string[]>((resolve, reject) => {
        const ts1 = dayjs().tz(TIMEZONE).subtract(60, 's');
        const ts2 = dayjs().tz(TIMEZONE).subtract(30, 's');
        const st1 = `Dia ${ts1.diff('2024-01-08', 'days') + 1}, ${ts1.format(
            'DD/MM/YY HH\\:mm\\:ss'
        )}`;
        const st2 = `Dia ${ts2.diff('2024-01-08', 'days') + 1}, ${ts2.format(
            'DD/MM/YY HH\\:mm\\:ss'
        )}`;
        ffmpeg()
            .input(stream)
            .noAudio()
            .outputOptions('-qscale:v 2')
            .videoFilter(
                `drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf: text='${st1}': x=0: y=h-lh: fontcolor=white: box=1: boxcolor=0x00000000@1: fontsize=24`
            )
            .output(file1)
            .frames(1)
            .output(file2)
            .videoFilters(
                `drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf: text='${st2}': x=0: y=h-lh: fontcolor=white: box=1: boxcolor=0x00000000@1: fontsize=24`
            )
            .outputOptions('-qscale:v 2')
            .seek(30)
            .frames(1)
            .on('progress', (progress) => {
                console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
            })
            .on('error', (err) => {
                console.log(`[ffmpeg] error: ${err.message}`);
                reject(err);
            })
            .on('end', () => {
                console.log('[ffmpeg] finished');
                resolve([file1, file2]);
            })
            .run();
    })

    return promise;
}

const getNonGSImages = async (files: string[]) => {
    const out = [];
    for (const file of files) {
        const origImg = await Jimp.read(file);
        const img = origImg.clone();

        img.crop(300, 0, img.getWidth() - 300, img.getHeight())
        img.scale(0.1)
        const pixels = [];
        for (let x = 0; x < img.bitmap.width; x++) {
            for (let y = 0; y < img.bitmap.height; y++) {
                const c = Jimp.intToRGBA(img.getPixelColor(x, y))
                const avg = (c.r + c.g + c.b) / 3
                const diffs = (avg - c.r)**2 + (avg - c.g)**2 + (avg - c.b)**2
                pixels.push(diffs)
            }
        }
        const check = pixels.reduce((a,b) => a+b) / pixels.length

        if (check > 10) {
            out.push(file);
        }
    }
    return out;
}

const postFrames = async () => {
    const images_1 = await getFrames('244881');
    const images_2 = await getFrames('772202');
    const allImages = await getNonGSImages([...images_1, ...images_2])

    const uploadedImages = await Promise.all(
        allImages.map(async (file) => {
            const img = fs.readFileSync(file);
            const uploaded = await agent.uploadBlob(img, {
                encoding: 'image/jpeg'
            });
            return {
                image: uploaded.data.blob,
                alt: '#bbb24'
            } satisfies AppBskyEmbedImages.Image;
        })
    );

    const embed =
        uploadedImages.length > 0
            ? {
                    $type: 'app.bsky.embed.images',
                    images: uploadedImages
                }
            : undefined;

    if (embed) {
        const timeStr = dayjs().tz(TIMEZONE).format('DD/MM HH:mm');

        const rt = new RichText({
            text: `${timeStr} #bbb24`
        });
        await rt.detectFacets(agent);

        const postRecord = {
            $type: 'app.bsky.feed.post',
            text: rt.text,
            facets: rt.facets,
            langs: ['pt'],
            embed: embed,
            createdAt: new Date().toISOString()
        };

        if (
            AppBskyFeedPost.isRecord(postRecord) &&
            AppBskyFeedPost.validateRecord(postRecord).success
        ) {
            await agent.post(postRecord);
        }
    }
};

const run = async () => {
    await agent.login({
        identifier: process.env.BSKY_DID ?? '',
        password: process.env.BSKY_PWD ?? ''
    });

    await postFrames();
    scheduleTasks();
};

run();
