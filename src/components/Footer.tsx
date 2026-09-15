import React from 'react';
import { Sparkles, Instagram, Facebook, Youtube, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  themeColor: string;
}

export const Footer: React.FC<FooterProps> = ({ themeColor }) => {
  return (
    <footer id="main-footer" className="bg-[#050608] text-neutral-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{
                  borderColor: `${themeColor}60`,
                  background: `linear-gradient(135deg, ${themeColor}20, rgba(0,0,0,0.6))`
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
              </div>
              <div>
                <span className="text-base font-black tracking-[0.2em] uppercase font-['Outfit'] text-white block leading-none">
                  AutoShine
                </span>
                <span
                  className="text-[9px] tracking-[0.3em] uppercase font-medium block mt-1"
                  style={{ color: themeColor }}
                >
                  Detailing Studio
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm mb-6">
              A premium mobile and in-studio car detailing service focused on paint correction,
              ceramic coatings, and showroom-level finishes. Certified installers of 9H SiO2 protection.
            </p>

            {/* Social icons, minimal and monochrome */}
            <div className="flex items-center gap-4 text-neutral-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:text-white hover:border-white/30 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:text-white hover:border-white/30 transition-all hover:scale-110"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.12 1.17 2.03 2.29 2.26 1.02.21 2.12-.04 2.91-.71.74-.6 1.18-1.52 1.22-2.48.05-3.37.02-6.75.03-10.12.02-2.73.01-5.46.02-8.19z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:text-white hover:border-white/30 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:text-white hover:border-white/30 transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:text-white hover:border-white/30 transition-all hover:scale-110"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services & Overview
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Detailing Process
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Package Pricing
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  About AutoShine
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Studio
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#warranty" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Ceramic Warranty Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white mb-4">
              Studio Location
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: themeColor }} />
                <span>482 Detailing Way, Silicon Bay, CA 94025</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: themeColor }} />
                <span>+1 (800) 555-7446</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: themeColor }} />
                <span>concierge@autoshinedetailing.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: themeColor }} />
                <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono gap-4">
          <p className="text-neutral-400">
            &copy; {new Date().getFullYear()} AutoShine Detailing Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
