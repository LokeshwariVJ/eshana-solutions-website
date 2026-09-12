import { writeFile } from "node:fs/promises";
import sharp from "sharp";
import { logoIconSvg } from "../lib/logo-mark.ts";

// ICO embeds PNG frames so legacy browsers use the same mark as the SVG icon.
const sizes = [16, 32, 48, 64];
const frames = [];
for (const size of sizes) frames.push(await sharp(Buffer.from(logoIconSvg())).resize(size, size).png().toBuffer());
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [index, frame] of frames.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
}
await writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([directory, ...frames]));
console.log("Generated favicon from shared Eshana mark (16, 32, 48, 64px).");
