import sharp from "sharp";
import { join } from "path";

const sourceDir = join(process.cwd(), "Pictures");
const outDir = join(process.cwd(), "public", "images");

const sourceMap = {
  "project-1": "549195223_804375665868400_8532774179361510228_n.jpg",
  "project-8": "484170442_650443117928323_2549562986161016979_n.jpg",
  "project-9": "484242657_650443214594980_5172462867969687638_n.jpg",
  "project-10": "484242810_650443234594978_7060065644994432009_n.jpg",
  "project-11": "484279620_648167078155927_6987091124345376352_n.jpg",
  "project-12": "484356144_648166901489278_2049239586015027777_n.jpg",
};

// fraction of height to crop off the top (collage header + floor plans)
const topFraction = {
  "project-1": 0.3,
  "project-8": 0.35,
  "project-9": 0.35,
  "project-10": 0.35,
  "project-11": 0.35,
  "project-12": 0.35,
};

for (const [name, sourceFile] of Object.entries(sourceMap)) {
  const src = join(sourceDir, sourceFile);
  const out = join(outDir, `${name}.jpg`);
  const meta = await sharp(src).metadata();
  if (!meta.width || !meta.height) continue;

  const top = Math.round(meta.height * topFraction[name]);
  const height = meta.height - top;

  const buf = await sharp(src)
    .extract({ left: 0, top, width: meta.width, height })
    .resize({ width: Math.min(meta.width, 2000), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  await sharp(buf).toFile(out + ".tmp");
  const { renameSync } = await import("fs");
  renameSync(out + ".tmp", out);
  console.log(`${name}.jpg <- ${sourceFile}, cropped to ${meta.width}x${height}`);
}
