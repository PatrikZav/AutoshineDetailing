import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Sliders, Menu, X, Phone } from 'lucide-react';
import { ServicePackage } from '../types';

interface NavbarProps {
  currentPackage: ServicePackage;
  themeColor: string;
  isDarkMode: boolean;
  onToggleThemeMode: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPackage,
  themeColor,
  isDarkMode,
  onToggleThemeMode,
  onOpenBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['services', 'process', 'pricing', 'reviews', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      if (window.scrollY < 300) {
        setActiveSection('hero');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#08090db3] backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-white/85 backdrop-blur-xl border-b border-black/10 py-3.5 shadow-sm'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group select-none"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
            style={{
              borderColor: `${themeColor}60`,
              background: `linear-gradient(135deg, ${themeColor}20, rgba(0,0,0,0.6))`,
              boxShadow: `0 0 16px ${themeColor}30`
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
          </div>
          <div>
            <span
              className={`text-base font-black tracking-[0.2em] uppercase font-['Outfit'] block leading-none ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}
            >
              AutoShine
            </span>
            <span
              className="text-[9px] tracking-[0.3em] uppercase font-medium block mt-1"
              style={{ color: themeColor }}
            >
              Ceramic &bull; Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full border border-white/5 bg-black/20 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 rounded-full relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : isDarkMode
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full opacity-25"
                    style={{ backgroundColor: themeColor }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Tools: Dark/Light Mode Toggle, Customize, Booking CTA */}
        <div className="flex items-center gap-3">
          {/* Theme Mode Toggle */}
          <button
            id="theme-mode-toggle-btn"
            type="button"
            onClick={onToggleThemeMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                : 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:text-black'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Book Now Button */}
          <button
            id="navbar-book-now-btn"
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-1.5"
            style={{
              backgroundColor: themeColor,
              color: '#000000',
              boxShadow: `0 0 16px ${themeColor}50`
            }}
          >
            <span>Book Now</span>
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 lg:hidden rounded-lg border ${
              isDarkMode ? 'border-white/10 text-white' : 'border-neutral-300 text-neutral-800'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-4 flex flex-col gap-3 ${
            isDarkMode ? 'bg-[#0a0c10] border-white/10' : 'bg-white border-neutral-200'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`py-2 text-sm tracking-wider uppercase font-medium ${
                isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
