/**
 * Extract all frames from animated WebP into individual composited WebP files.
 * Uses sharp to properly composite delta frames (handles blend/dispose flags).
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'animation.webp');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'sequences', 'default');

async function extractFrames() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Clean existing frame files
  const existing = fs.readdirSync(OUTPUT_DIR).filter(f => f.startsWith('frame_'));
  for (const f of existing) {
    fs.unlinkSync(path.join(OUTPUT_DIR, f));
  }

  console.log(`Reading animated WebP: ${INPUT}`);
  const inputBuffer = fs.readFileSync(INPUT);

  // Get metadata to find frame count
  const metadata = await sharp(inputBuffer, { animated: true }).metadata();
  const pageCount = metadata.pages || 1;
  console.log(`Detected ${pageCount} frames, dimensions: ${metadata.width}x${metadata.height}`);
  console.log(`Format: ${metadata.format}`);

  // Extract all frames at once using animated sharp
  const image = sharp(inputBuffer, { animated: true, pages: -1 });
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const frameWidth = info.width;
  const frameHeight = Math.round(info.height / pageCount);
  const channels = info.channels;
  const frameSize = frameWidth * frameHeight * channels;

  console.log(`Frame dimensions: ${frameWidth}x${frameHeight}, channels: ${channels}`);
  console.log(`Extracting ${pageCount} frames...`);

  for (let i = 0; i < pageCount; i++) {
    const frameData = data.subarray(i * frameSize, (i + 1) * frameSize);
    const filename = `frame_${String(i + 1).padStart(4, '0')}.webp`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    await sharp(frameData, {
      raw: {
        width: frameWidth,
        height: frameHeight,
        channels: channels
      }
    })
      .webp({ quality: 85 })
      .toFile(outputPath);

    if ((i + 1) % 20 === 0 || i === 0 || i === pageCount - 1) {
      console.log(`  Extracted frame ${i + 1}/${pageCount}: ${filename}`);
    }
  }

  console.log(`\nDone! ${pageCount} frames saved to ${OUTPUT_DIR}`);
}

extractFrames().catch(err => {
  console.error('Frame extraction failed:', err);
  process.exit(1);
});
