import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/packages';

interface ReviewsSectionProps {
  isDarkMode: boolean;
  themeColor: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  isDarkMode,
  themeColor
}) => {
  return (
    <section
      id="reviews"
      className={`py-28 relative transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#08090c] text-white' : 'bg-neutral-100 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span
              className="text-xs font-mono tracking-[0.35em] uppercase font-bold block mb-3"
              style={{ color: themeColor }}
            >
              Enthusiast Proven &bull; 5.0 Rating
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Outfit']">
              Showroom Proof
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-sm font-mono font-bold text-white ml-2">
              4.98 / 5.0 from 180+ Exotic & Daily Drivers
            </span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`p-8 rounded-2xl border flex flex-col justify-between relative ${
                isDarkMode ? 'bg-[#0e1017] border-white/10' : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="relative">
                <Quote
                  className="w-10 h-10 opacity-15 absolute -top-2 -left-2 pointer-events-none"
                  style={{ color: themeColor }}
                />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 relative z-10 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <p
                  className={`text-sm leading-relaxed mb-6 italic relative z-10 ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}
                >
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider font-['Outfit'] text-white">
                    {review.name}
                  </h4>
                  <p className="text-xs font-mono text-neutral-400">{review.vehicle}</p>
                </div>

                <span
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border"
                  style={{ borderColor: `${themeColor}40`, color: themeColor }}
                >
                  {review.package}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
