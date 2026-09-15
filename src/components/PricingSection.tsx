import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { ServicePackage } from '../types';

interface PricingSectionProps {
  packages: ServicePackage[];
  currentPackageId: string;
  isDarkMode: boolean;
  themeColor: string;
  onSelectPackage: (pkg: ServicePackage) => void;
  onOpenBookingWithPackage: (pkg: ServicePackage) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  packages,
  currentPackageId,
  isDarkMode,
  themeColor,
  onSelectPackage,
  onOpenBookingWithPackage
}) => {
  return (
    <section
      id="pricing"
      className={`py-28 relative transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0e] text-white' : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span
            className="text-xs font-mono tracking-[0.35em] uppercase font-bold block mb-3"
            style={{ color: themeColor }}
          >
            Tiered Investment &bull; Guaranteed Results
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Outfit']">
            Service Packages
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Choose from our specialized tiers. Every package is executed with uncompromising attention to detail,
            safe washing techniques, and certified surface defense.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => {
            const isCurrent = pkg.id === currentPackageId;
            const isFeatured = pkg.badge || pkg.name.toLowerCase().includes('ceramic');

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 sm:p-10 border transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'border-2 shadow-2xl scale-[1.02]'
                    : isDarkMode
                    ? 'bg-[#10121a] border-white/10 hover:border-white/20'
                    : 'bg-white border-neutral-200 shadow-md'
                }`}
                style={{
                  borderColor: isCurrent ? themeColor : undefined,
                  boxShadow: isCurrent ? `0 0 32px ${themeColor}25` : undefined
                }}
              >
                {/* Badge if present */}
                {pkg.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-black shadow-lg"
                    style={{ backgroundColor: pkg.themeColor || themeColor }}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Top package meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono uppercase tracking-[0.25em] font-semibold"
                      style={{ color: pkg.themeColor || themeColor }}
                    >
                      {pkg.subtitle}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-3xl font-black uppercase font-['Outfit'] tracking-tight mb-2">
                    {pkg.name} {pkg.subtitle}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl sm:text-5xl font-black font-['Outfit'] text-white">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">/ starting base</span>
                  </div>

                  <p
                    className={`text-xs leading-relaxed mb-8 pb-6 border-b border-white/10 ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-2 font-bold">
                      What&apos;s Included:
                    </span>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${pkg.themeColor || themeColor}20`,
                            color: pkg.themeColor || themeColor
                          }}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span
                          className={`text-xs leading-tight ${
                            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                          }`}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 border-t border-white/10 flex flex-col gap-2.5 mt-auto">
                  <button
                    type="button"
                    onClick={() => onOpenBookingWithPackage(pkg)}
                    className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: pkg.themeColor || themeColor,
                      color: '#000000',
                      boxShadow: `0 0 20px ${(pkg.themeColor || themeColor)}40`
                    }}
                  >
                    <span>Book This Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-2.5 px-6 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                      isCurrent
                        ? 'border-white/40 text-white bg-white/5'
                        : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {isCurrent ? 'Viewing in Hero Sequence' : 'Preview In Hero Parallax'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
