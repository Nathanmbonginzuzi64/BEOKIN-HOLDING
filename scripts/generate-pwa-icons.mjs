import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "../public/logo.png");
const publicDir = path.join(__dirname, "../public");

const sizes = [192, 512];

for (const size of sizes) {
  await sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: { r: 18, g: 21, b: 28, alpha: 0 },
    })
    .png()
    .toFile(path.join(publicDir, `icon-${size}.png`));

  console.log(`Généré icon-${size}.png`);
}
