// Entry point for the 24 November 2026 news-image entry.
//
// The entry is the PNG sitting next to this file. This program checks that
// the image exists and fits the bounty gate (at most 1 MiB), makes sure the
// destination directory exists, and copies the image there as entry.png.
//
// The destination comes from MAKEFUN_OUTPUT_DIR, falling back to /output,
// which is where the grader looks for the finished image.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_IMAGE_BYTES = 1024 * 1024;

const sourcePath = join(dirname(fileURLToPath(import.meta.url)), "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = join(outputDir, "entry.png");

if (!existsSync(sourcePath)) {
  throw new Error(
    `entry image not found at ${sourcePath}; expected entry.png next to main.ts`,
  );
}

const imageSize = statSync(sourcePath).size;
console.log(`Found entry image: ${imageSize} bytes.`);
if (imageSize > MAX_IMAGE_BYTES) {
  throw new Error(
    `entry image is ${imageSize} bytes, over the 1 MiB limit`,
  );
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, targetPath);

console.log(`Wrote ${targetPath} (${imageSize} bytes).`);
