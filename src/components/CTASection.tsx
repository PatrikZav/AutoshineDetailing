import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Phone, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServicePackage } from '../types';

interface CTASectionProps {
  currentPackage: ServicePackage;
  themeColor: string;
  isDarkMode: boolean;
  onOpenBooking: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  currentPackage,
  themeColor,
  isDarkMode,
  onOpenBooking
}) => {
  return (
    <section
      id="contact"
      className={`py-28 relative transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#06070a] text-white' : 'bg-neutral-900 text-white'
      }`}
    >
      {/* Background glowing gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none opacity-20"
        style={{ backgroundColor: themeColor }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="rounded-3xl border border-white/15 p-8 sm:p-12 lg:p-16 bg-[#0c0e14]/90 backdrop-blur-2xl shadow-2xl overflow-hidden relative">
          
          {/* Subtle accent border line */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-mono uppercase tracking-[0.3em] font-bold"
                  style={{ color: themeColor }}
                >
                  Flagship Detailing Experience
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Outfit'] leading-[0.95] mb-6">
                Ready For That <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${themeColor}, #ffffff)`
                  }}
                >
                  Mirror Ceramic Gloss?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8 max-w-xl">
                Whether you drive an everyday performance daily or an exotic collector masterpiece,
                AutoShine delivers surgical multi-stage paint correction and long-lasting 9H ceramic
                protection directly to your door or in our climate-controlled studio.
              </p>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-neutral-200">
                    Certified 9H Si02 Formulations
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-neutral-200">
                    Spot-Free Deionized Water System
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-neutral-200">
                    3 to 5 Year Warranty Certified
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-neutral-200">
                    Insured & Bonded Studio
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2.5"
                  style={{
                    backgroundColor: themeColor,
                    color: '#000000',
                    boxShadow: `0 0 28px ${themeColor}60`
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation & Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:18005557446"
                  className="px-6 py-4 rounded-full border border-white/25 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white hover:bg-white/10 hover:border-white transition-all duration-200 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>1-800-SHINE-PRO</span>
                </a>
              </div>
            </div>

            {/* Right Column: Square Ceramic CTA Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                {/* Generated Square CTA Ceramic Image */}
                <img
                  src={`${import.meta.env.BASE_URL || '/'}assets/images/autoshine_ceramic_cta.jpg`.replace(/\/+/g, '/')}
                  alt="AutoShine Ceramic Coating Package"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient edge overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlay details badge */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span
                      className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold block mb-1 text-cyan-300"
                    >
                      Showroom Ceramic Shield
                    </span>
                    <h4 className="text-xl font-black uppercase font-['Outfit'] text-white">
                      AutoShine Ceramic
                    </h4>
                    <p className="text-xs text-neutral-300 font-mono">
                      Deep Gloss &bull; Extreme Hydrophobic Shell
                    </p>
                  </div>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-black shadow-lg"
                    style={{ backgroundColor: themeColor }}
                  >
                    9H
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
