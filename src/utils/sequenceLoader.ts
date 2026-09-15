/**
 * High performance sequence loader & canvas renderer.
 * Preloads individual still frame images (numbered) into memory as HTMLImageElement objects
 * and provides cover-style canvas drawing for scroll scrubbing.
 */

export interface LoadedSequence {
  frames: HTMLImageElement[];
  totalFrames: number;
  drawFrame: (ctx: CanvasRenderingContext2D, index: number, canvasWidth: number, canvasHeight: number) => void;
  isReady: boolean;
}

// In-memory cache for loaded frame sequences
const sequenceCache = new Map<string, HTMLImageElement[]>();

/**
 * Draw an image onto canvas with cover-style scaling so it fills the screen without distortion.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | undefined,
  canvasWidth: number,
  canvasHeight: number
) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  // Cover logic: preserve aspect ratio, fill canvas, center image
  const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const scaledWidth = imgWidth * scale;
  const scaledHeight = imgHeight * scale;
  const offsetX = (canvasWidth - scaledWidth) / 2;
  const offsetY = (canvasHeight - scaledHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
}

/**
 * Preloads all individual frame images into memory as HTMLImageElement objects.
 * Frames are expected at /assets/sequences/default/frame_NNNN.webp (1-indexed, 4-digit padded).
 */
export async function loadSequence(
  _sequenceUrl: string,
  frameCount: number = 192,
  _framePattern?: string,
  onProgress?: (progress: number) => void
): Promise<LoadedSequence> {
  const effectiveCount = Math.max(1, Math.min(frameCount || 192, 240));
  const cacheKey = `individual_frames_${effectiveCount}`;

  // Check if frames are already cached in memory
  if (sequenceCache.has(cacheKey)) {
    const cachedFrames = sequenceCache.get(cacheKey)!;
    onProgress?.(100);
    return createSequenceFromFrames(cachedFrames);
  }

  const frames: HTMLImageElement[] = new Array(effectiveCount);
  let loadedCount = 0;

  // Function to load a single frame image
  const loadSingleFrame = (index: number): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      // 1-indexed, 4-digit zero-padded: frame_0001.webp, frame_0002.webp, ...
      const frameNum = String(index + 1).padStart(4, '0');
      const baseUrl = import.meta.env.BASE_URL || '/';
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const url = `${cleanBase}assets/sequences/default/frame_${frameNum}.webp`;

      const notifyLoaded = () => {
        frames[index] = img;
        loadedCount++;
        if (onProgress) {
          onProgress(Math.min(99, Math.round((loadedCount / effectiveCount) * 100)));
        }
        resolve(img);
      };

      img.onload = () => {
        if (typeof img.decode === 'function') {
          img.decode().then(notifyLoaded).catch(notifyLoaded);
        } else {
          notifyLoaded();
        }
      };

      img.onerror = () => {
        // Still count as loaded to not stall progress
        loadedCount++;
        if (onProgress) {
          onProgress(Math.min(99, Math.round((loadedCount / effectiveCount) * 100)));
        }
        resolve(img);
      };

      img.src = url;
    });
  };

  // Preload frames in parallel batches for high speed
  const batchSize = 20;
  for (let i = 0; i < effectiveCount; i += batchSize) {
    const batch = [];
    for (let j = i; j < Math.min(i + batchSize, effectiveCount); j++) {
      batch.push(loadSingleFrame(j));
    }
    await Promise.all(batch);
  }

  // Forward fill any missing frames to guarantee continuous playback
  for (let i = 0; i < frames.length; i++) {
    if (!frames[i] && i > 0) {
      frames[i] = frames[i - 1];
    }
  }

  sequenceCache.set(cacheKey, frames);
  onProgress?.(100);
  return createSequenceFromFrames(frames);
}

function createSequenceFromFrames(frames: HTMLImageElement[]): LoadedSequence {
  return {
    frames,
    totalFrames: frames.length,
    isReady: true,
    drawFrame: (ctx: CanvasRenderingContext2D, index: number, width: number, height: number) => {
      const safeIndex = Math.max(0, Math.min(frames.length - 1, Math.floor(index)));
      const img = frames[safeIndex];
      if (img) {
        drawImageCover(ctx, img, width, height);
      }
    }
  };
}
