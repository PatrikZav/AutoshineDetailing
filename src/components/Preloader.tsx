import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  themeColor?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  progress,
  isLoaded,
  themeColor = '#00f0ff'
}) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          id="hero-preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080b] text-neutral-100 select-none overflow-hidden"
        >
          {/* Subtle atmospheric ambient glow */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: themeColor }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-8 text-center">
            {/* Brand Logo & Name */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-6"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}25, #0a0e17)`,
                  boxShadow: `0 0 24px ${themeColor}30`
                }}
              >
                <Sparkles className="w-5 h-5" style={{ color: themeColor }} />
              </div>
              <div className="text-left">
                <span className="text-sm font-black tracking-[0.25em] uppercase text-white font-['Outfit'] block leading-none">
                  AutoShine
                </span>
                <span className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase font-medium mt-1 block">
                  Detailing Studio
                </span>
              </div>
            </motion.div>

            {/* Clean, minimal horizontal loading progress line */}
            <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden border border-white/10 relative">
              <motion.div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${progress}%`,
                  backgroundColor: themeColor,
                  boxShadow: `0 0 12px ${themeColor}, 0 0 24px ${themeColor}80`
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
