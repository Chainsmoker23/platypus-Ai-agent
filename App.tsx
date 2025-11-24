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
import PlaygroundPage from './pages/Playground';

const App: React.FC = () => {
  console.log('Rendering: App');
  const [page, setPage] = useState('home');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
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

  const navigateToPlayground = () => {
    setPage('playground');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setPage('home');
  };

  if (page === 'playground') {
    return <PlaygroundPage onNavigateHome={navigateToHome} />;
  }

  return (
    <div className="min-h-screen text-platypus-text font-sans transition-colors duration-300">
      <div ref={sentinelRef} style={{ position: 'absolute', top: '10px', height: '1px' }} />
      <Header scrolled={headerScrolled} onNavigateToPlayground={navigateToPlayground} />
      <main>
        <HeroSection onNavigateToPlayground={navigateToPlayground} />
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
    </div>
  );
};

export default App;