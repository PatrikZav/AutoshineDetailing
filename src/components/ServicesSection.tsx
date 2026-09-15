import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Layers, Eye, Droplets, Gauge } from 'lucide-react';

interface ServicesSectionProps {
  isDarkMode: boolean;
  themeColor: string;
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  isDarkMode,
  themeColor,
  onSelectService
}) => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Precision Paint Correction',
      subtitle: 'Multi-Stage Leveling',
      description:
        'Eliminating micro-marring, rotary holograms, and severe swirl marks using dual-action German polishers and jeweling abrasives to unlock pure optical depth.',
      stat: '95%+',
      statLabel: 'Defect Removal',
      serviceKey: 'Ceramic'
    },
    {
      icon: Shield,
      title: '9H SiO2 Ceramic Coatings',
      subtitle: 'Covalent Molecular Bond',
      description:
        'Permanent quartz defense against acidic rain, UV oxidation, bird etching, and industrial fallout with extreme 110° hydrophobic contact angles.',
      stat: '3-5 Yrs',
      statLabel: 'Certified Longevity',
      serviceKey: 'Ceramic'
    },
    {
      icon: Droplets,
      title: 'Snow Foam & Decon Bath',
      subtitle: 'Contactless Dissolution',
      description:
        'pH-neutral citrus hyper-foams dissolve abrasive grit before mitt contact, accompanied by active chemical iron binders that purge sintered brake dust.',
      stat: '100%',
      statLabel: 'Swirl-Free Wash',
      serviceKey: 'Basic'
    },
    {
      icon: Layers,
      title: 'Interior Sanctuary Detail',
      subtitle: 'Steam & Leather Conditioning',
      description:
        'High-pressure dry steam sanitization, hot water fiber extraction, and nourishing matte-finish lanolin leather feeding that preserves factory aroma.',
      stat: 'OEM',
      statLabel: 'Matte Finish',
      serviceKey: 'Premium'
    }
  ];

  return (
    <section
      id="services"
      className={`py-28 relative transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0d] text-white' : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      {/* Decorative ambient background accents */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ backgroundColor: themeColor }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-mono tracking-[0.3em] uppercase font-bold"
                style={{ color: themeColor }}
              >
                Studio Mastery &bull; AutoShine Detailing
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Outfit']">
              Engineered For The <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${themeColor}, #ffffff)`
                }}
              >
                Obsessive Perfectionist
              </span>
            </h2>
          </div>

          <p
            className={`max-w-md text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            AutoShine Detailing is a premier mobile and in-studio automotive atelier specializing in
            paint correction, multi-year ceramic coatings, and showroom-level finishes for modern exotics,
            classic sports cars, and prestigious daily drivers.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => onSelectService(pillar.serviceKey)}
                className={`group p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isDarkMode
                    ? 'bg-[#101218] border-white/10 hover:border-white/25 hover:bg-[#131722]'
                    : 'bg-white border-neutral-200 hover:border-neutral-400 shadow-sm'
                }`}
              >
                {/* Subtle hover accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: themeColor }}
                />

                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderColor: `${themeColor}40`,
                      background: `linear-gradient(135deg, ${themeColor}15, rgba(0,0,0,0.4))`
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: themeColor }} />
                  </div>

                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.25em] block mb-1"
                    style={{ color: themeColor }}
                  >
                    {pillar.subtitle}
                  </span>

                  <h3 className="text-xl font-bold uppercase tracking-wide font-['Outfit'] mb-3">
                    {pillar.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black font-['Outfit'] tracking-tight block">
                      {pillar.stat}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                      {pillar.statLabel}
                    </span>
                  </div>

                  <span
                    className="text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    style={{ color: themeColor }}
                  >
                    Explore &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Studio Specs Banner */}
        <div
          className={`mt-12 p-8 rounded-2xl border flex flex-wrap items-center justify-between gap-6 ${
            isDarkMode ? 'bg-[#0f1118]/80 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold border"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              ISO
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider font-['Outfit']">
                Climate-Controlled Dust Extraction Bay
              </h4>
              <p className="text-xs text-neutral-400">
                Maintained at strict 21°C and &lt;45% relative humidity for optimal ceramic covalent bonding.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <div>
              <span className="text-white font-bold text-sm block">100% Deionized</span>
              <span>Water Filtration</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="text-white font-bold text-sm block">Shortwave IR</span>
              <span>Lamp Curing Bay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
