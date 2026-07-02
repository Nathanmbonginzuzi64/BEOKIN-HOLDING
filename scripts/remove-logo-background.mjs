import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "../public/logo.jpeg");
const output = path.join(__dirname, "../public/logo.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const visited = new Uint8Array(width * height);
const queue = [];

function isBackgroundPixel(index) {
  const r = data[index];
  const g = data[index + 1];
  const b = data[index + 2];
  return r >= 245 && g >= 245 && b >= 245;
}

function enqueue(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const pixel = y * width + x;
  if (visited[pixel]) return;
  const index = pixel * 4;
  if (!isBackgroundPixel(index)) return;
  visited[pixel] = 1;
  queue.push(pixel);
}

for (let x = 0; x < width; x++) {
  enqueue(x, 0);
  enqueue(x, height - 1);
}

for (let y = 0; y < height; y++) {
  enqueue(0, y);
  enqueue(width - 1, y);
}

while (queue.length > 0) {
  const pixel = queue.pop();
  const x = pixel % width;
  const y = Math.floor(pixel / width);
  const index = pixel * 4;
  data[index + 3] = 0;

  enqueue(x + 1, y);
  enqueue(x - 1, y);
  enqueue(x, y + 1);
  enqueue(x, y - 1);
}

await sharp(data, {
  raw: {
    width,
    height,
    channels: 4,
  },
})
  .png()
  .toFile(output);

console.log(`Logo transparent sauvegardé : ${output}`);
