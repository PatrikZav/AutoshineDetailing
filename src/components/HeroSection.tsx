import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, Sparkles, Instagram, Facebook, Youtube, Twitter, Loader2, ArrowDown } from 'lucide-react';
import { ServicePackage } from '../types';
import { LoadedSequence, drawImageCover } from '../utils/sequenceLoader';

interface HeroSectionProps {
  currentPackage: ServicePackage;
  currentIndex: number;
  totalPackages: number;
  loadedSequence: LoadedSequence | null;
  isSequenceLoading: boolean;
  isDarkMode: boolean;
  themeColor: string;
  onPrevPackage: () => void;
  onNextPackage: () => void;
  onSelectPackageIndex: (index: number) => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentPackage,
  currentIndex,
  totalPackages,
  loadedSequence,
  isSequenceLoading,
  isDarkMode,
  themeColor,
  onPrevPackage,
  onNextPackage,
  onSelectPackageIndex,
  onOpenBooking
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Refs for values that change during scroll but should NOT cause effect recreation
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;
  const totalPackagesRef = useRef(totalPackages);
  totalPackagesRef.current = totalPackages;
  const onSelectPackageIndexRef = useRef(onSelectPackageIndex);
  onSelectPackageIndexRef.current = onSelectPackageIndex;
  const loadedSequenceRef = useRef(loadedSequence);
  loadedSequenceRef.current = loadedSequence;

  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const frameCount = loadedSequence?.totalFrames || currentPackage.frameCount || 192;
  // Pinned container height on desktop; normal full-screen height on mobile
  const containerHeight = isMobile ? viewportHeight : Math.max(viewportHeight * 2.2, 1600);

  // Resize listener for viewport height and canvas pixel resolution
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
  }, []);

  // Frame rendering helper onto the canvas with cover scaling
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const seq = loadedSequenceRef.current;
    if (seq?.frames && seq.frames.length > 0) {
      const safeIndex = Math.max(0, Math.min(seq.frames.length - 1, frameIdx));
      const frameImg = seq.frames[safeIndex];
      if (frameImg) {
        drawImageCover(ctx, frameImg, canvas.width, canvas.height);
      }
    } else if (seq?.drawFrame) {
      seq.drawFrame(ctx, frameIdx, canvas.width, canvas.height);
    }
  }, []); // stable — reads from ref

  // Immediate paint when sequence finishes loading or changes (fixes initial black screen)
  useEffect(() => {
    if (loadedSequence && !isMobile) {
      updateCanvasDimensions();
      renderFrame(currentFrameRef.current);
    }
  }, [loadedSequence, isMobile, renderFrame, updateCanvasDimensions]);

  // Parallax Scroll Tracking: Throttled via requestAnimationFrame
  useEffect(() => {
    const updateFrameOnScroll = () => {
      rafIdRef.current = null;
      if (!containerRef.current || !canvasRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) {
        renderFrame(currentFrameRef.current);
        return;
      }

      // Calculate how far into the pinned container the user has scrolled
      const scrolled = -rect.top;
      // Clamped between 0 (top of container just reached) and 1 (bottom reached)
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      // Synchronize category index based on current scroll progress
      const pkgCount = totalPackagesRef.current;
      const targetCategory = Math.min(
        pkgCount - 1,
        Math.max(0, Math.floor(progress * pkgCount))
      );
      if (targetCategory !== currentIndexRef.current) {
        onSelectPackageIndexRef.current(targetCategory);
      }

      const seq = loadedSequenceRef.current;
      const totalFrames = seq?.totalFrames || 192;
      const targetFrame = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * (totalFrames - 1)))
      );

      currentFrameRef.current = targetFrame;
      renderFrame(targetFrame);
    };

    const handleScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateFrameOnScroll);
      }
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
      updateCanvasDimensions();
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateFrameOnScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial canvas setup and paint
    updateCanvasDimensions();
    updateFrameOnScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [renderFrame, updateCanvasDimensions]);

  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const mobilePosterUrl = `${cleanBase}assets/sequences/default/frame_0192.webp`;

  return (
    <section
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full select-none"
      style={{ height: `${containerHeight}px` }}
    >
      {/* Sticky Fullscreen Hero Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background: Static WebP image on mobile, interactive Canvas sequence on desktop */}
        {isMobile ? (
          <img
            src={mobilePosterUrl}
            alt="AutoShine Detailing"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
          />
        ) : (
          <canvas
            ref={canvasRef}
            id="hero-sequence-canvas"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />
        )}

        {/* Ambient Dark/Light Gradients for Text Contrast without obscuring the center */}
        <div
          className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-700 ${
            isDarkMode
              ? 'bg-gradient-to-r from-black/85 via-black/30 to-black/60'
              : 'bg-gradient-to-r from-white/85 via-white/20 to-white/70'
          }`}
        />

        {/* Bottom edge smooth blend into services section */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2] transition-colors duration-500 ${
            isDarkMode
              ? 'bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/40 to-transparent'
              : 'bg-gradient-to-t from-neutral-50 via-neutral-50/40 to-transparent'
          }`}
        />

        {/* Radial highlight mapped to theme color behind car & text */}
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none z-[1] opacity-20 transition-all duration-700"
          style={{ backgroundColor: themeColor }}
        />

        {/* Top Spacer for sticky Navbar */}
        <div className="w-full h-24 relative z-10" />

        {/* Main Content Area: Left Overlay, Clean Center, Right Variant Navigation */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex items-center justify-between">
          
          {/* Overlay Text Block (Left Side) */}
          <div className="w-full max-w-lg lg:max-w-xl pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPackage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {/* Brand Tag / Logo Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: themeColor,
                      boxShadow: `0 0 10px ${themeColor}`
                    }}
                  />
                  <span
                    className="text-xs font-mono uppercase tracking-[0.3em] font-semibold"
                    style={{ color: themeColor }}
                  >
                    AutoShine Experience
                  </span>
                </div>

                {/* Large Bold Uppercase Package Name */}
                <h1
                  id="hero-package-name"
                  className={`text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight font-['Outfit'] leading-[0.9] ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {currentPackage.name}
                </h1>

                {/* Under the name: smaller subtitle line, light font weight */}
                <h2
                  id="hero-package-subtitle"
                  className={`text-2xl sm:text-4xl font-light uppercase tracking-[0.25em] mt-1 font-['Outfit'] ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}
                  style={{ color: themeColor }}
                >
                  {currentPackage.subtitle}
                </h2>

                {/* Under the subtitle: short descriptive paragraph */}
                <p
                  id="hero-package-description"
                  className={`text-sm sm:text-base leading-relaxed mt-4 max-w-md ${
                    isDarkMode ? 'text-neutral-300/90' : 'text-neutral-600'
                  }`}
                >
                  {currentPackage.description}
                </p>

                {/* Below paragraph: two full rounded CTA buttons side by side */}
                {/* Left: transparent background and white text. Right: solid background with black text. */}
                <div className="flex flex-wrap items-center gap-3 mt-7">
                  <button
                    id="hero-cta-book"
                    type="button"
                    onClick={onOpenBooking}
                    className={`rounded-full px-7 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isDarkMode
                        ? 'border-white/40 bg-transparent text-white hover:bg-white/10 hover:border-white'
                        : 'border-neutral-800 bg-transparent text-neutral-900 hover:bg-black/5'
                    }`}
                  >
                    BOOK A
                  </button>

                  <button
                    id="hero-cta-detail"
                    type="button"
                    onClick={onOpenBooking}
                    className="rounded-full px-7 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                    style={{
                      backgroundColor: themeColor,
                      color: '#000000',
                      boxShadow: `0 0 20px ${themeColor}60`
                    }}
                  >
                    DETAIL
                  </button>
                </div>

                {/* Feature highlight chips */}
                <div className="flex items-center gap-4 mt-6 text-[11px] font-mono tracking-wider text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" style={{ color: themeColor }} />
                    {currentPackage.estimatedTime}
                  </span>
                  <span>&bull;</span>
                  <span className="font-semibold text-white">
                    Starting at {currentPackage.price}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Area: Intentionally Kept Clean to let the animated background shine! */}
          <div className="hidden md:block flex-1 min-w-[60px]" />

          {/* Right Side Variant Navigation */}
          <div className="relative flex items-center gap-6 pl-4">
            {/* Huge Package Index Number (01, 02, 03 ...) */}
            <div className="flex flex-col items-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPackage.id}
                  initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 0.85, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                  className={`text-6xl sm:text-8xl lg:text-9xl font-black font-['Outfit'] tracking-tighter leading-none select-none ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}
                  style={{
                    textShadow: `0 0 40px ${themeColor}30`
                  }}
                >
                  {formattedIndex}
                </motion.div>
              </AnimatePresence>

              {/* Package indicators dots */}
              <div className="flex items-center gap-2 mt-2">
                {Array.from({ length: totalPackages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectPackageIndex(idx)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: idx === currentIndex ? '24px' : '6px',
                      backgroundColor: idx === currentIndex ? themeColor : 'rgba(255,255,255,0.2)'
                    }}
                    title={`Go to Package ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Slim Vertical Navigation Strip with PREV / Divider / NEXT */}
            <div className="flex flex-col items-center justify-center p-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md relative">
              {/* Optional small loading indicator when switching */}
              {isSequenceLoading && (
                <div
                  className="absolute -top-3 -right-3 p-1 rounded-full bg-black/90 border border-white/20"
                  title="Loading package sequence..."
                >
                  <Loader2 className="w-3 h-3 animate-spin" style={{ color: themeColor }} />
                </div>
              )}

              {/* PREV button with upward arrow */}
              <button
                id="hero-nav-prev"
                type="button"
                onClick={onPrevPackage}
                aria-label="Previous package"
                className="group flex flex-col items-center py-2 px-1 text-[10px] tracking-widest font-mono text-neutral-400 hover:text-white transition-colors"
              >
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span className="writing-mode-vertical uppercase font-bold mt-1 text-[9px] tracking-[0.2em]">
                  PREV
                </span>
              </button>

              {/* Thin vertical divider line */}
              <div
                className="w-px h-8 my-1 opacity-30"
                style={{ backgroundColor: themeColor }}
              />

              {/* NEXT button with downward arrow */}
              <button
                id="hero-nav-next"
                type="button"
                onClick={onNextPackage}
                aria-label="Next package"
                className="group flex flex-col items-center py-2 px-1 text-[10px] tracking-widest font-mono text-neutral-400 hover:text-white transition-colors"
              >
                <span className="writing-mode-vertical uppercase font-bold mb-1 text-[9px] tracking-[0.2em]">
                  NEXT
                </span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Center: Minimal Monochrome Social Icons & Scroll Hint */}
        <div className="relative z-10 w-full pb-6 pt-2 flex flex-col items-center justify-center">
          {/* Scroll progress cue */}
          <div className="flex items-center gap-2 mb-3 text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-400">
            <ArrowDown className="w-3 h-3 animate-bounce" style={{ color: themeColor }} />
            <span>Scroll Down</span>
          </div>

          {/* Social icons, minimal and monochrome */}
          <div className="flex items-center gap-5 text-neutral-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-white transition-colors hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-white transition-colors hover:scale-110"
              aria-label="TikTok"
            >
              {/* Monochrome TikTok glyph */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.12 1.17 2.03 2.29 2.26 1.02.21 2.12-.04 2.91-.71.74-.6 1.18-1.52 1.22-2.48.05-3.37.02-6.75.03-10.12.02-2.73.01-5.46.02-8.19z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-white transition-colors hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-white transition-colors hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-white transition-colors hover:scale-110"
              aria-label="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
