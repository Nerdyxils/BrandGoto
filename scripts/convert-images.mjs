import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const TARGET_DIRS = ['public/images', 'src/assets'];
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG']);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

const convert = async (filePath) => {
  const ext = path.extname(filePath);
  if (!EXTENSIONS.has(ext)) return;
  const base = filePath.slice(0, -ext.length);
  const webpOut = `${base}.webp`;
  const avifOut = `${base}.avif`;

  const image = sharp(filePath);
  await image.webp({ quality: 82 }).toFile(webpOut);
  await image.avif({ quality: 50 }).toFile(avifOut);
};

const run = async () => {
  for (const relDir of TARGET_DIRS) {
    const absDir = path.join(ROOT, relDir);
    const files = await walk(absDir);
    for (const file of files) {
      await convert(file);
    }
  }
  console.log('Image conversion complete.');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
