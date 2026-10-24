import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const body = Buffer.concat([typeBuf, data]);
  const crc = crc32(body);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([lenBuf, body, crcBuf]);
}

function generateIcon(size, outPath) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8] = 8; // 8 bits
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk("IHDR", ihdrData);

  // Scanlines: width * 4 bytes + 1 filter byte per row
  const rowLen = 1 + size * 4;
  const rawData = Buffer.alloc(rowLen * size);

  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0; // Filter: none

    for (let x = 0; x < size; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Dark VS Code gray rounded background (#252526)
      const r = Math.min(x, size - 1 - x, y, size - 1 - y);
      const radius = size * 0.18;
      let bg = true;
      if (x < radius && y < radius && Math.hypot(x - radius, y - radius) > radius) bg = false;
      if (x >= size - radius && y < radius && Math.hypot(x - (size - radius), y - radius) > radius) bg = false;
      if (x < radius && y >= size - radius && Math.hypot(x - radius, y - (size - radius)) > radius) bg = false;
      if (x >= size - radius && y >= size - radius && Math.hypot(x - (size - radius), y - (size - radius)) > radius) bg = false;

      if (!bg) {
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0; // transparent
        continue;
      }

      // Draw Subtitle / CC badge symbol inside
      // Outer rect for subtitle box
      const boxLeft = size * 0.18;
      const boxRight = size * 0.82;
      const boxTop = size * 0.28;
      const boxBottom = size * 0.72;

      // Subtitle lines inside
      const line1Y = size * 0.42;
      const line2Y = size * 0.58;
      const lineH = Math.max(2, size * 0.08);

      const inLine1 = y >= line1Y && y < line1Y + lineH && x >= boxLeft + size * 0.1 && x <= boxRight - size * 0.1;
      const inLine2 = y >= line2Y && y < line2Y + lineH && x >= boxLeft + size * 0.15 && x <= boxRight - size * 0.25;

      const onBoxBorder =
        ((x >= boxLeft && x <= boxRight && (Math.abs(y - boxTop) <= 2 || Math.abs(y - boxBottom) <= 2)) ||
        (y >= boxTop && y <= boxBottom && (Math.abs(x - boxLeft) <= 2 || Math.abs(x - boxRight) <= 2)));

      if (inLine1 || inLine2) {
        // Bright Yellow/White subtitle line (#ffea00)
        rawData[pxOffset] = 255;
        rawData[pxOffset + 1] = 234;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 255;
      } else if (onBoxBorder) {
        // Hot pink border (#ff69b4)
        rawData[pxOffset] = 255;
        rawData[pxOffset + 1] = 105;
        rawData[pxOffset + 2] = 180;
        rawData[pxOffset + 3] = 255;
      } else {
        // Dark background (#1e1e1e)
        rawData[pxOffset] = 30;
        rawData[pxOffset + 1] = 30;
        rawData[pxOffset + 2] = 30;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk("IDAT", compressed);
  const iendChunk = makeChunk("IEND", Buffer.alloc(0));

  const finalPng = Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, finalPng);
}

const iconsDir = path.join(process.cwd(), "src", "icons");
generateIcon(48, path.join(iconsDir, "icon-48.png"));
generateIcon(96, path.join(iconsDir, "icon-96.png"));
generateIcon(128, path.join(iconsDir, "icon-128.png"));
console.log("Generated icons in " + iconsDir);
