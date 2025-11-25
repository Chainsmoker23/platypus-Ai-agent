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
import ChatWidget from './components/ChatWidget';
import ForestWalkSection from './components/ForestWalkSection';

type Page = 'home' | 'playground';
export type Theme = 'light' | 'dark';

const App: React.FC = (): React.ReactElement => {
  const [page, setPage] = useState<Page>('home');
  const [headerScrolled, setHeaderScrolled] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('light');
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

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
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
    <div className="min-h-screen text-platypus-text dark:bg-platypus-dark-background dark:text-platypus-dark-text font-sans transition-colors duration-300">
      <div ref={sentinelRef} style={{ position: 'absolute', top: '10px', height: '1px' }} />
      <Header 
        scrolled={headerScrolled} 
        onNavigateToPlayground={navigateToPlayground}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
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
      <ForestWalkSection />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;