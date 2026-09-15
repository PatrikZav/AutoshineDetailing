import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Car, MapPin, CheckCircle2, Sparkles, Phone, Mail, User } from 'lucide-react';
import { ServicePackage } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: ServicePackage[];
  initialPackage: ServicePackage;
  themeColor: string;
  isDarkMode: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  packages,
  initialPackage,
  themeColor,
  isDarkMode
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState(initialPackage.id);
  const [serviceType, setServiceType] = useState<'studio' | 'mobile'>('studio');
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || initialPackage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
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
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
              isDarkMode
                ? 'bg-[#0e1017] border-white/20 text-white'
                : 'bg-white border-neutral-300 text-neutral-900'
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    borderColor: `${themeColor}60`,
                    background: `linear-gradient(135deg, ${themeColor}20, rgba(0,0,0,0.5))`
                  }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: themeColor }} />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase font-['Outfit'] tracking-tight">
                    Reserve Detailing Appointment
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Showroom finish with certified 9H ceramic warranty
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

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {submitted ? (
                <div className="text-center py-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border"
                    style={{
                      borderColor: themeColor,
                      backgroundColor: `${themeColor}20`,
                      color: themeColor
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black uppercase font-['Outfit'] mb-2">
                    Appointment Confirmed!
                  </h4>
                  <p className="text-sm text-neutral-300 max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="text-white font-bold">{name || 'valued client'}</span>.
                    Our detailing specialist will call you shortly to confirm your vehicle prep
                    and arrival details.
                  </p>

                  <div className="p-4 rounded-xl border border-white/10 bg-black/40 text-left max-w-sm mx-auto mb-6 text-xs font-mono space-y-1.5">
                    <div>
                      <span className="text-neutral-400">Package:</span>{' '}
                      <span className="text-white font-bold">{selectedPkg.name} {selectedPkg.subtitle}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Vehicle:</span>{' '}
                      <span className="text-white">{vehicle || 'Specified at intake'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Location:</span>{' '}
                      <span className="text-white">
                        {serviceType === 'studio' ? 'Climate-Controlled Studio Bay' : 'Mobile Detailing Van'}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Est. Time:</span>{' '}
                      <span className="text-white">{selectedPkg.estimatedTime}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg"
                    style={{
                      backgroundColor: themeColor,
                      color: '#000000'
                    }}
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service Package Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      1. Select Service Package
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {packages.map((pkg) => {
                        const isSel = pkg.id === selectedPkgId;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setSelectedPkgId(pkg.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSel
                                ? 'border-white bg-white/10 shadow-md'
                                : 'border-white/10 bg-black/30 hover:border-white/20'
                            }`}
                          >
                            <span
                              className="text-[10px] font-mono block uppercase tracking-wider"
                              style={{ color: pkg.themeColor || themeColor }}
                            >
                              {pkg.subtitle}
                            </span>
                            <span className="text-xs font-bold uppercase font-['Outfit'] block text-white">
                              {pkg.name}
                            </span>
                            <span className="text-[11px] font-mono text-neutral-400 mt-1 block">
                              {pkg.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Location preference */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      2. Service Location
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setServiceType('studio')}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                          serviceType === 'studio'
                            ? 'border-white bg-white/10'
                            : 'border-white/10 bg-black/30'
                        }`}
                      >
                        <MapPin className="w-4 h-4 shrink-0" style={{ color: themeColor }} />
                        <div>
                          <span className="text-xs font-bold uppercase font-['Outfit'] block text-white">
                            In-Studio Bay
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            Silicon Bay Detailing Studio
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setServiceType('mobile')}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                          serviceType === 'mobile'
                            ? 'border-white bg-white/10'
                            : 'border-white/10 bg-black/30'
                        }`}
                      >
                        <Car className="w-4 h-4 shrink-0" style={{ color: themeColor }} />
                        <div>
                          <span className="text-xs font-bold uppercase font-['Outfit'] block text-white">
                            Mobile Van Unit
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            We bring water & power to you
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      3. Vehicle Year, Make & Model
                    </label>
                    <div className="relative">
                      <Car className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        placeholder="e.g. 2024 Porsche 911 GT3 RS / Tesla Model S"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Preferred Arrival Window
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        >
                          <option value="08:00 AM" className="bg-neutral-900">08:00 AM - Morning Slot</option>
                          <option value="11:00 AM" className="bg-neutral-900">11:00 AM - Midday Slot</option>
                          <option value="02:00 PM" className="bg-neutral-900">02:00 PM - Afternoon Slot</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Client Contact Details */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      4. Client Contact
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone Number"
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/10 bg-black/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: selectedPkg.themeColor || themeColor,
                        color: '#000000',
                        boxShadow: `0 0 24px ${(selectedPkg.themeColor || themeColor)}50`
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Reservation ({selectedPkg.price})</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
