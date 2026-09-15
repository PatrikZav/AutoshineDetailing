import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, Palette, Film, Sparkles, RotateCcw, Check, Plus, Sun, Moon } from 'lucide-react';
import { ServicePackage } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: ServicePackage[];
  currentPackageIndex: number;
  onUpdatePackage: (index: number, updated: ServicePackage) => void;
  onAddPackage: (pkg: ServicePackage) => void;
  onSelectPackageIndex: (index: number) => void;
  onResetDefaults: () => void;
  isDarkMode: boolean;
  onToggleThemeMode: () => void;
}

const PRESET_COLORS = [
  { name: 'Electric Cyan', hex: '#00f0ff' },
  { name: 'Electric Blue', hex: '#0066ff' },
  { name: 'Luminous Sky', hex: '#38bdf8' },
  { name: 'Hyper Cobalt', hex: '#2563eb' },
  { name: 'Emerald Gloss', hex: '#10b981' },
  { name: 'Racing Gold', hex: '#f59e0b' },
  { name: 'Solar Crimson', hex: '#ef4444' },
  { name: 'Ultra Violet', hex: '#a855f7' },
];

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  packages,
  currentPackageIndex,
  onUpdatePackage,
  onAddPackage,
  onSelectPackageIndex,
  onResetDefaults,
  isDarkMode,
  onToggleThemeMode
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'sequence'>('content');
  const currentPkg = packages[currentPackageIndex] || packages[0];

  const handleFieldChange = (field: keyof ServicePackage, value: string | number) => {
    const updated: ServicePackage = {
      ...currentPkg,
      [field]: value
    };
    onUpdatePackage(currentPackageIndex, updated);
  };

  const handleAddNewVariant = () => {
    const newIdx = packages.length + 1;
    const newPkg: ServicePackage = {
      id: `custom-package-${Date.now()}`,
      name: 'CUSTOM',
      subtitle: 'FINISH',
      description: 'Custom bespoke automotive detailing package tailored to your exact paint chemistry.',
      themeColor: '#00f0ff',
      mode: 'dark',
      sequenceUrl: 'https://s3.ezgif.com/tmp/ezgif-3c017a7b309d64dc.webp',
      frameCount: 192,
      framePattern: '/assets/sequences/default/frame_{index}.webp',
      price: '$550',
      estimatedTime: '4 - 5 Hours',
      features: [
        'Custom paint correction staging',
        'Hydrophobic sealant or ceramic coat',
        'Deep interior cleanse & conditioning'
      ]
    };
    onAddPackage(newPkg);
    onSelectPackageIndex(packages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
              isDarkMode
                ? 'bg-[#0f1118] border-white/20 text-white'
                : 'bg-white border-neutral-300 text-neutral-900'
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    borderColor: `${currentPkg.themeColor}60`,
                    background: `linear-gradient(135deg, ${currentPkg.themeColor}20, rgba(0,0,0,0.5))`
                  }}
                >
                  <Sliders className="w-5 h-5" style={{ color: currentPkg.themeColor }} />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase font-['Outfit'] tracking-tight">
                    Website & Package Customizer
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Live real-time editing of text, theme colors & parallax sequences
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Package Selector Pills */}
            <div className="px-6 py-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto bg-black/20">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
                Active Package:
              </span>
              {packages.map((pkg, idx) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => onSelectPackageIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 border ${
                    idx === currentPackageIndex
                      ? 'text-black shadow-md'
                      : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                  }`}
                  style={{
                    backgroundColor: idx === currentPackageIndex ? pkg.themeColor : 'transparent',
                    borderColor: idx === currentPackageIndex ? pkg.themeColor : undefined
                  }}
                >
                  0{idx + 1}. {pkg.name} {pkg.subtitle}
                </button>
              ))}

              <button
                type="button"
                onClick={handleAddNewVariant}
                className="px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase border border-dashed border-white/20 text-neutral-400 hover:text-white hover:border-white/50 flex items-center gap-1 shrink-0"
                title="Add new package variant"
              >
                <Plus className="w-3 h-3" />
                <span>New</span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 px-6">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeTab === 'content'
                    ? 'border-cyan-400 text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
                style={{
                  borderColor: activeTab === 'content' ? currentPkg.themeColor : 'transparent'
                }}
              >
                Content & Copy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('theme')}
                className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeTab === 'theme'
                    ? 'border-cyan-400 text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
                style={{
                  borderColor: activeTab === 'theme' ? currentPkg.themeColor : 'transparent'
                }}
              >
                Theme & Colors
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sequence')}
                className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeTab === 'sequence'
                    ? 'border-cyan-400 text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
                style={{
                  borderColor: activeTab === 'sequence' ? currentPkg.themeColor : 'transparent'
                }}
              >
                WebP Parallax Sequence
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Package Name (Hero Title)
                      </label>
                      <input
                        type="text"
                        value={currentPkg.name}
                        onChange={(e) => handleFieldChange('name', e.target.value.toUpperCase())}
                        placeholder="e.g. CERAMIC"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Package Subtitle
                      </label>
                      <input
                        type="text"
                        value={currentPkg.subtitle}
                        onChange={(e) => handleFieldChange('subtitle', e.target.value.toUpperCase())}
                        placeholder="e.g. COATING"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Service Description (1-3 sentences)
                    </label>
                    <textarea
                      rows={3}
                      value={currentPkg.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      placeholder="Describe the detailing package benefits..."
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Price Display
                      </label>
                      <input
                        type="text"
                        value={currentPkg.price}
                        onChange={(e) => handleFieldChange('price', e.target.value)}
                        placeholder="e.g. $890"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Estimated Turnaround Time
                      </label>
                      <input
                        type="text"
                        value={currentPkg.estimatedTime}
                        onChange={(e) => handleFieldChange('estimatedTime', e.target.value)}
                        placeholder="e.g. 1 - 2 Days"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'theme' && (
                <div className="space-y-6">
                  {/* Dark / Light mode toggle */}
                  <div className="p-4 rounded-2xl border border-white/10 bg-black/30 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase font-['Outfit']">
                        Website Visual Mode
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">
                        {isDarkMode ? 'Dark Cinematic (Black/Charcoal canvas)' : 'Light Studio (Off-white canvas)'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onToggleThemeMode}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-mono font-bold uppercase tracking-wider"
                    >
                      {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
                      <span>{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
                    </button>
                  </div>

                  {/* Brand Theme Color */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      Brand Accent Color (Applied to Hero, CTAs, Highlights)
                    </label>

                    {/* Presets */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                      {PRESET_COLORS.map((preset) => {
                        const isSelected = currentPkg.themeColor.toLowerCase() === preset.hex.toLowerCase();
                        return (
                          <button
                            key={preset.hex}
                            type="button"
                            onClick={() => handleFieldChange('themeColor', preset.hex)}
                            className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                              isSelected
                                ? 'border-white bg-white/10 shadow-lg'
                                : 'border-white/10 bg-black/20 hover:border-white/25'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                              style={{ backgroundColor: preset.hex }}
                            />
                            <span className="text-xs font-mono truncate">{preset.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Color Picker & Hex Input */}
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-black/30">
                      <input
                        type="color"
                        value={currentPkg.themeColor}
                        onChange={(e) => handleFieldChange('themeColor', e.target.value)}
                        className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={currentPkg.themeColor}
                        onChange={(e) => handleFieldChange('themeColor', e.target.value)}
                        placeholder="#00f0ff"
                        className="w-32 px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-white font-mono text-xs uppercase focus:outline-none"
                      />
                      <span className="text-xs font-mono text-neutral-400">
                        Custom Hex Code
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sequence' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-white/10 bg-black/30">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Film className="w-4 h-4" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">
                        Scroll-Tied Parallax Engine
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Each service package can render an independent WebP animation sequence. As the user
                      scrolls down, frames advance; scrolling up reverses them smoothly.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      WebP Sequence Path or URL
                    </label>
                    <input
                      type="text"
                      value={currentPkg.sequenceUrl}
                      onChange={(e) => handleFieldChange('sequenceUrl', e.target.value)}
                      placeholder="https://.../sequence.webp"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
                      Supplied URL: https://s3.ezgif.com/tmp/ezgif-3c017a7b309d64dc.webp
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Frame Count
                      </label>
                      <input
                        type="number"
                        value={currentPkg.frameCount}
                        onChange={(e) => handleFieldChange('frameCount', parseInt(e.target.value) || 192)}
                        min={20}
                        max={360}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Local Fallback Pattern
                      </label>
                      <input
                        type="text"
                        value={currentPkg.framePattern || ''}
                        onChange={(e) => handleFieldChange('framePattern', e.target.value)}
                        placeholder="/assets/sequences/default/frame_{index}.webp"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between bg-black/20">
              <button
                type="button"
                onClick={onResetDefaults}
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Defaults</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: currentPkg.themeColor,
                  color: '#000000',
                  boxShadow: `0 0 16px ${currentPkg.themeColor}50`
                }}
              >
                Apply & Return to Site
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
