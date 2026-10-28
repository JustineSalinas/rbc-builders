import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const dir = join(process.cwd(), "public", "images");
const MAX_WIDTH = 2000;

const files = readdirSync(dir).filter((f) =>
  [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase())
);

for (const file of files) {
  const full = join(dir, file);
  const before = statSync(full).size;
  const ext = extname(file).toLowerCase();
  const name = basename(file, ext);
  const img = sharp(full);
  const meta = await img.metadata();

  const resize =
    meta.width && meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : {};

  const buf = await img
    .resize({ ...resize, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();

  const outPath = join(dir, `${name}.jpg`);
  await sharp(buf).toFile(outPath + ".tmp");
  const { renameSync, unlinkSync } = await import("fs");
  if (ext !== ".jpg") unlinkSync(full);
  renameSync(outPath + ".tmp", outPath);

  const after = statSync(outPath).size;
  console.log(
    `${file} -> ${name}.jpg  ${(before / 1024).toFixed(0)}KB -> ${(
      after / 1024
    ).toFixed(0)}KB`
  );
}
