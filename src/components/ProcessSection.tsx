import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/packages';
import { CheckCircle2, ShieldCheck, Flame, Gauge, Sparkles } from 'lucide-react';

interface ProcessSectionProps {
  isDarkMode: boolean;
  themeColor: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  isDarkMode,
  themeColor
}) => {
  const products = [
    {
      brand: '9H SiO2 Quartz Matrix',
      category: 'Inorganic Hardness',
      desc: 'High solid-content polysilazane glass formulas resistant to chemical abrasion pH 2 to pH 12.'
    },
    {
      brand: 'Dual-Action Rotary Gear',
      category: 'Heat & Hologram Defense',
      desc: 'Precision balanced random orbital polishers that safely level clear coats without heat build-up.'
    },
    {
      brand: 'Deionized Spot-Free Water',
      category: 'Zero TDS Purity',
      desc: 'Hospital-grade resin filtration system eliminating all calcium, magnesium, and mineral scaling.'
    },
    {
      brand: 'Shortwave Infrared Curing',
      category: 'Molecular Crosslinking',
      desc: 'Thermal lamp arrays that cure ceramic layers from the inside out in 45 minutes flat.'
    }
  ];

  return (
    <section
      id="process"
      className={`py-28 relative transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#08090c] text-white' : 'bg-neutral-100 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span
            className="text-xs font-mono tracking-[0.35em] uppercase font-bold block mb-3"
            style={{ color: themeColor }}
          >
            Laboratory Grade Workflow
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Outfit']">
            The 4-Stage Studio Process
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Detailing is not mere washing — it is an exacting scientific discipline combining microscopic
            decontamination, paint leveling optics, and chemical ceramic cross-linking.
          </p>
        </div>

        {/* 4 Process Steps Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`p-8 rounded-2xl border flex flex-col justify-between relative group ${
                isDarkMode
                  ? 'bg-[#0e1017] border-white/10 hover:border-white/20'
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-3xl font-black font-['Outfit'] opacity-30 group-hover:opacity-100 transition-opacity"
                  style={{ color: themeColor }}
                >
                  {step.step}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center border text-xs font-mono font-bold"
                  style={{
                    borderColor: `${themeColor}40`,
                    backgroundColor: `${themeColor}10`,
                    color: themeColor
                  }}
                >
                  0{idx + 1}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide font-['Outfit'] mb-3">
                  {step.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed mb-6 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <span
                  className="text-[11px] font-mono tracking-wider font-semibold block"
                  style={{ color: themeColor }}
                >
                  {step.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products & Chemistry Showcase Grid */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase font-bold block mb-2"
              style={{ color: themeColor }}
            >
              Exacting Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight font-['Outfit']">
              Premium Chemicals & Studio Hardware
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border ${
                  isDarkMode ? 'bg-[#0b0d13] border-white/10' : 'bg-white border-neutral-200 shadow-sm'
                }`}
              >
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.25em] block mb-1"
                  style={{ color: themeColor }}
                >
                  {item.category}
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider font-['Outfit'] mb-2 text-white">
                  {item.brand}
                </h4>
                <p
                  className={`text-xs leading-relaxed ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
