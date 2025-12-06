
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import ForestWalkSection from './components/ForestWalkSection';
import JourneySection from './components/JourneySection';
import TestimonialsSection from './components/TestimonialsSection';
import GettingStartedSection from './components/GettingStartedSection';
import ScrollToTop from './components/ScrollToTop';
import FloatingParticles from './components/FloatingParticles';
import CustomCursor from './components/CustomCursor';

type Page = 'home' | 'playground';
export type Theme = 'light' | 'dark';

const App: React.FC = (): React.ReactElement => {
  const [page, setPage] = useState<Page>('home');
  const [headerScrolled, setHeaderScrolled] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('light');
  const [scrollProgress, setScrollProgress] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

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

    // Scroll Progress Logic
    const handleScroll = () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;
        setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateToPlayground = useCallback(() => {
    setPage('playground');
    window.scrollTo(0, 0);
  }, []);

  const navigateToHome = useCallback(() => {
    setPage('home');
  }, []);

  if (page === 'playground') {
    return <PlaygroundPage onNavigateHome={navigateToHome} />;
  }

  return (
    <div className="min-h-screen text-platypus-text dark:bg-platypus-dark-background dark:text-platypus-dark-text font-sans transition-colors duration-300 relative">
      {/* Custom Magnetic Cursor */}
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-platypus-primary via-purple-400 to-platypus-accent z-[60]" 
        style={{ width: `${scrollProgress * 100}%` }} 
      />
      
      {/* Background Particles */}
      <FloatingParticles />

      <div ref={sentinelRef} style={{ position: 'absolute', top: '10px', height: '1px' }} />
      <Header 
        scrolled={headerScrolled} 
        onNavigateToPlayground={navigateToPlayground}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="relative z-10">
        <HeroSection onNavigateToPlayground={navigateToPlayground} />
        <FeaturesSection />
        <JourneySection />
        <LanguagesSection />
        <DemoSection />
        <WhyPlatypusSection />
        <TestimonialsSection />
        <ComparisonSection />
        <PricingSection />
        <PrivacySection />
        <GettingStartedSection />
        <CTASection />
      </main>
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <ForestWalkSection />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
