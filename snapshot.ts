import axios from "axios";
import fs from "fs";

const run = async () => {
  const utc = new Date().getTime();
  console.log(utc);

  const cameras = [
    "bbb01",
    "bbb02",
    "bbb03",
    "bbb04",
    "bbb05",
    "bbb06",
    "bbb07",
    "bbb08",
    "bbb09",
    "bbb10",
    "bbb11",
    "bbb12",
  ];

  for (const camera of cameras) {
    await axios
      .get(
        `https://live.video.globo.com/${camera}/snapshot/640/360/?utc=${utc}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        fs.writeFileSync(`${utc}_${camera}.jpg`, res.data, "base64");
      })
      .catch(() => null);
  }
};

run();
