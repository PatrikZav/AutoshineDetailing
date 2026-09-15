import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/packages';

interface FAQSectionProps {
  isDarkMode: boolean;
  themeColor: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  isDarkMode,
  themeColor
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className={`py-28 relative transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0d] text-white' : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-mono tracking-[0.35em] uppercase font-bold block mb-3"
            style={{ color: themeColor }}
          >
            Clarity & Protocol &bull; FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Outfit']">
            Frequently Asked Questions
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Everything you need to know about our ceramic technology, paint correction limits,
            mobile dispatching, and warranties.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? isDarkMode
                      ? 'bg-[#11141c] border-white/20 shadow-xl'
                      : 'bg-white border-neutral-300 shadow-md'
                    : isDarkMode
                    ? 'bg-[#0e1017] border-white/10 hover:border-white/20'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded border"
                      style={{
                        borderColor: `${themeColor}40`,
                        color: themeColor,
                        backgroundColor: `${themeColor}10`
                      }}
                    >
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-['Outfit'] tracking-tight">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{
                      borderColor: isOpen ? themeColor : 'rgba(255,255,255,0.1)',
                      color: isOpen ? themeColor : 'inherit'
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1">
                        <p
                          className={`text-sm leading-relaxed ${
                            isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                          }`}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
