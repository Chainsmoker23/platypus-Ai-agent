import React, { useState } from 'react';
import { PlatypusLogoSVG } from './PlatypusPlaceholders';
import type { Theme } from '../App';

interface HeaderProps {
  scrolled: boolean;
  onNavigateToPlayground: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const ThemeToggle: React.FC<{ theme: 'light' | 'dark'; onToggle: () => void }> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="w-14 h-7 rounded-full bg-platypus-secondary dark:bg-platypus-dark-secondary p-1 flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-platypus-primary"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {theme === 'light' 
            ? <SunIcon className="w-full h-full p-0.5 text-yellow-500" />
            : <MoonIcon className="w-full h-full p-0.5 text-platypus-primary" />
        }
      </div>
    </button>
  );
};

const MenuIcon: React.FC = (): React.ReactElement => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC = (): React.ReactElement => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ scrolled, onNavigateToPlayground, theme, onToggleTheme }): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileLinkClick = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-platypus-background/95 dark:bg-platypus-dark-background/95 backdrop-blur-xl' : 'bg-platypus-background/80 dark:bg-transparent backdrop-blur-md'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlatypusLogoSVG className="w-10 h-10" />
          <span className="text-2xl font-bold text-platypus-text dark:text-platypus-dark-text">Platypus</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">Features</a>
          <a href="#demo" className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">Demo</a>
          <button onClick={onNavigateToPlayground} className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">Playground</button>
          <a href="#compare" className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">Compare</a>
          <a href="#pricing" className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">Pricing</a>
          <a href="#privacy" className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">Privacy</a>
        </nav>
        <div className="flex items-center space-x-4">
           <div className="hidden md:block">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
           </div>
           <a href="#download" className="px-5 py-2 bg-platypus-accent text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hidden md:block">
              Download
            </a>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-platypus-background/95 dark:bg-platypus-dark-background/95 backdrop-blur-xl animate-fade-in-up animation-duration-300">
          <nav className="flex flex-col items-center space-y-4 px-6 pb-6 pt-2">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors text-lg">Features</a>
            <a href="#demo" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors text-lg">Demo</a>
            <button onClick={() => handleMobileLinkClick(onNavigateToPlayground)} className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors text-lg">Playground</button>
            <a href="#compare" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors text-lg">Compare</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors text-lg">Pricing</a>
            <a href="#privacy" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors text-lg">Privacy</a>
            <div className="pt-4">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
            <a href="#download" onClick={() => setIsMenuOpen(false)} className="w-full text-center mt-4 px-5 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Download
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;