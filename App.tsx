import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import LanguagesSection from './components/LanguagesSection';
import DemoSection from './components/DemoSection';
import WhyPlatypusSection from './components/WhyPlatypusSection';
import ComparisonSection from './components/ComparisonSection';
import PricingSection from './components/PricingSection';
import PrivacySection from './components/PrivacySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set `scrolled` to true when the sentinel is NOT intersecting (i.e., has scrolled out of view).
        setHeaderScrolled(!entry.isIntersecting);
      },
      {
        root: null, // Observe relative to the viewport
        rootMargin: '0px',
        threshold: 1.0, // Fire when the element is fully out of view
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, []);


  return (
    <div className="min-h-screen text-platypus-text font-sans transition-colors duration-300">
      {/* This sentinel is an invisible element. When it scrolls out of view, the IntersectionObserver fires. */}
      <div ref={sentinelRef} style={{ position: 'absolute', top: '10px', height: '1px' }} />
      <Header scrolled={headerScrolled} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LanguagesSection />
        <DemoSection />
        <WhyPlatypusSection />
        <ComparisonSection />
        <PricingSection />
        <PrivacySection />
        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;