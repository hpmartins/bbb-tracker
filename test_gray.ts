import Jimp from 'jimp';
import 'dotenv/config';
import fs from 'fs';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const FOLDER = process.env.FOLDER ?? './';

const files = fs
    .readdirSync(`${FOLDER}/test`, { withFileTypes: true })
    .filter((item) => !item.isDirectory());

const t = async () => {
    for (const file of files) {
        if (file.name.startsWith('ch')) continue;
        const img = await Jimp.read(`${file.path}/${file.name}`);
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

        console.log(pixels.reduce((a,b) => a+b) / pixels.length)
        await img.writeAsync(`${file.path}/ch_${file.name}`);
    }
};

t();
