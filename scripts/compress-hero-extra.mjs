import sharp from "sharp";
import { join } from "path";

const dir = join(process.cwd(), "public", "images");
const names = ["hero-2", "hero-3", "hero-4"];

for (const name of names) {
  const file = join(dir, `${name}.jpg`);
  const buf = await sharp(file)
    .resize({ width: 2000, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  await sharp(buf).toFile(file + ".tmp");
  const { renameSync } = await import("fs");
  renameSync(file + ".tmp", file);
  console.log(name, "done", (buf.length / 1024).toFixed(0) + "KB");
}
