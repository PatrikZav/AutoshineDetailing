/**
 * AutoShine Detailing - Cinematic Parallax Experience
 */

import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_PACKAGES } from './data/packages';
import { ServicePackage } from './types';
import { loadSequence, LoadedSequence } from './utils/sequenceLoader';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  // Packages State - directly defined in code
  const [packages] = useState<ServicePackage[]>(INITIAL_PACKAGES);
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);
  const currentPackage = packages[currentPackageIndex] || packages[0];

  // Theme & Mode State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Active theme color is derived from active package's theme color
  const themeColor = currentPackage.themeColor || '#00f0ff';

  // Sequence Preloading State
  const [preloaderProgress, setPreloaderProgress] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [loadedSequence, setLoadedSequence] = useState<LoadedSequence | null>(null);
  const [isSequenceLoading, setIsSequenceLoading] = useState(false);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingPkg, setSelectedBookingPkg] = useState<ServicePackage>(currentPackage);

  // Load active sequence
  const loadActivePackageSequence = useCallback(async (pkg: ServicePackage, isInitial: boolean) => {
    if (!isInitial) {
      setIsSequenceLoading(true);
    }

    try {
      const sequence = await loadSequence(
        pkg.sequenceUrl,
        pkg.frameCount,
        pkg.framePattern,
        (percent) => {
          if (isInitial) {
            setPreloaderProgress(percent);
          }
        }
      );

      setLoadedSequence(sequence);

      if (isInitial) {
        setPreloaderProgress(100);
        setTimeout(() => {
          setIsInitialLoaded(true);
        }, 400);
      }
    } catch (err) {
      console.error('Failed to load sequence:', err);
      if (isInitial) {
        setIsInitialLoaded(true);
      }
    } finally {
      setIsSequenceLoading(false);
    }
  }, []);

  // Initial Load - load once, all packages share the same animation frames
  useEffect(() => {
    loadActivePackageSequence(currentPackage, true);
  }, []);

  // Handle Package Navigation (PREV / NEXT)
  const handleSelectPackageIndex = (idx: number) => {
    if (idx >= 0 && idx < packages.length) {
      setCurrentPackageIndex(idx);
      const heroContainer = document.getElementById('hero-scroll-container');
      if (heroContainer) {
        const totalScrollable = heroContainer.offsetHeight - window.innerHeight;
        if (totalScrollable > 0) {
          const targetScroll = heroContainer.offsetTop + (idx / packages.length + 0.05) * totalScrollable;
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    }
  };

  const handlePrevPackage = () => {
    const prevIdx = (currentPackageIndex - 1 + packages.length) % packages.length;
    handleSelectPackageIndex(prevIdx);
  };

  const handleNextPackage = () => {
    const nextIdx = (currentPackageIndex + 1) % packages.length;
    handleSelectPackageIndex(nextIdx);
  };

  const handleOpenBooking = (pkg?: ServicePackage) => {
    setSelectedBookingPkg(pkg || currentPackage);
    setIsBookingOpen(true);
  };

  const handleSelectServiceFromSection = (serviceKey: string) => {
    const foundIdx = packages.findIndex(
      (p) =>
        p.name.toLowerCase().includes(serviceKey.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(serviceKey.toLowerCase())
    );
    if (foundIdx !== -1) {
      handleSelectPackageIndex(foundIdx);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-clip ${
        isDarkMode ? 'bg-[#0a0a0c] text-white' : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      {/* Full-Screen Preloader Overlay */}
      <Preloader
        progress={preloaderProgress}
        isLoaded={isInitialLoaded}
        themeColor={themeColor}
      />

      {/* Sticky Top Navigation Bar */}
      <Navbar
        currentPackage={currentPackage}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
        onToggleThemeMode={() => setIsDarkMode(!isDarkMode)}
        onOpenBooking={() => handleOpenBooking(currentPackage)}
      />

      {/* Hero Section with WebP Scroll Parallax */}
      <HeroSection
        currentPackage={currentPackage}
        currentIndex={currentPackageIndex}
        totalPackages={packages.length}
        loadedSequence={loadedSequence}
        isSequenceLoading={isSequenceLoading}
        isDarkMode={isDarkMode}
        themeColor={themeColor}
        onPrevPackage={handlePrevPackage}
        onNextPackage={handleNextPackage}
        onSelectPackageIndex={(idx) => setCurrentPackageIndex(idx)}
        onOpenBooking={() => handleOpenBooking(currentPackage)}
      />

      {/* Services / About Section */}
      <ServicesSection
        isDarkMode={isDarkMode}
        themeColor={themeColor}
        onSelectService={handleSelectServiceFromSection}
      />

      {/* Process & Products Section */}
      <ProcessSection
        isDarkMode={isDarkMode}
        themeColor={themeColor}
      />

      {/* Pricing / Packages Section */}
      <PricingSection
        packages={packages}
        currentPackageId={currentPackage.id}
        isDarkMode={isDarkMode}
        themeColor={themeColor}
        onSelectPackage={(pkg) => {
          const idx = packages.findIndex((p) => p.id === pkg.id);
          if (idx !== -1) {
            handleSelectPackageIndex(idx);
          }
        }}
        onOpenBookingWithPackage={(pkg) => handleOpenBooking(pkg)}
      />

      {/* Reviews / Social Proof Section */}
      <ReviewsSection
        isDarkMode={isDarkMode}
        themeColor={themeColor}
      />

      {/* FAQ Section */}
      <FAQSection
        isDarkMode={isDarkMode}
        themeColor={themeColor}
      />

      {/* Final Call-to-Action with Custom Square Ceramic Graphic */}
      <CTASection
        currentPackage={currentPackage}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
        onOpenBooking={() => handleOpenBooking(currentPackage)}
      />

      {/* Black Background Footer */}
      <Footer themeColor={themeColor} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packages={packages}
        initialPackage={selectedBookingPkg}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
