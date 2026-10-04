import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, isMaskable = false) {
  // Simple uncompressed or deflate PNG generator
  // Color type 6 (RGBA), 8-bit depth
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image scanlines
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * (isMaskable ? 0.35 : 0.42);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background
      let r = 11;
      let g = 17;
      let b = 32;
      let a = 255;

      // Inner glowing athletic element / circle
      if (dist < radius) {
        // Orange / flame dumbbell badge
        const t = Math.max(0, Math.min(1, (radius - dist) / radius));
        r = Math.round(249 * t + 15 * (1 - t));
        g = Math.round(115 * t + 23 * (1 - t));
        b = Math.round(22 * t + 42 * (1 - t));

        // Dumbbell bar silhouette inside
        const barDistY = Math.abs(dy);
        const barDistX = Math.abs(dx);
        if (barDistY < radius * 0.15 && barDistX < radius * 0.7) {
          r = 240;
          g = 240;
          b = 245;
        }
        // Plates
        if (barDistX > radius * 0.45 && barDistX < radius * 0.65 && barDistY < radius * 0.45) {
          r = 255;
          g = 255;
          b = 255;
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/pwa-192x192.png', createPNG(192, 192, false));
fs.writeFileSync('./public/pwa-512x512.png', createPNG(512, 512, false));
fs.writeFileSync('./public/pwa-maskable-512x512.png', createPNG(512, 512, true));
fs.writeFileSync('./public/apple-touch-icon.png', createPNG(180, 180, false));
fs.writeFileSync('./public/favicon.ico', createPNG(32, 32, false));

console.log('PWA PNG icons generated successfully!');
