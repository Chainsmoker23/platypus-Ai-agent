
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

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#demo', label: 'Demo' },
  { href: 'playground', label: 'Playground' },
  { href: '#compare', label: 'Compare' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#privacy', label: 'Privacy' },
];

const Header: React.FC<HeaderProps> = ({ scrolled, onNavigateToPlayground, theme, onToggleTheme }): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    if (href === 'playground') {
      onNavigateToPlayground();
    } else {
      // Smooth scroll for internal links
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-platypus-background/95 dark:bg-platypus-dark-background/95 backdrop-blur-xl' : 'bg-platypus-background/80 dark:bg-transparent backdrop-blur-md'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 cursor-pointer" aria-label="Platypus Home">
          <PlatypusLogoSVG className={`w-10 h-10 transition-all duration-300 ${!scrolled ? 'animate-logo-pulse' : 'animate-fade-in-subtle'}`} />
          <span className="text-2xl font-bold text-platypus-text dark:text-platypus-dark-text">Platypus</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map(link => (
            link.href === 'playground' ? (
              <button key={link.label} onClick={onNavigateToPlayground} className="nav-link text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">
                {link.label}
              </button>
            ) : (
              <a key={link.label} href={link.href} className="nav-link text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors">
                {link.label}
              </a>
            )
          ))}
        </nav>

        <div className="flex items-center space-x-4">
           <div className="hidden lg:block">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
           </div>
           <a href="#download" className="px-5 py-2 bg-platypus-accent text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hidden lg:block">
              Download
            </a>
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
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
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-platypus-background/95 dark:bg-platypus-dark-background/95 backdrop-blur-xl">
          <nav className="flex flex-col items-center space-y-4 px-6 pb-6 pt-2">
            {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href === 'playground' ? '#' : link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-platypus-subtle hover:text-platypus-primary dark:text-platypus-dark-subtle dark:hover:text-platypus-primary transition-colors text-lg opacity-0 animate-slide-in-up"
                  style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'forwards' }}
                >
                  {link.label}
                </a>
            ))}
            <div className="pt-4 opacity-0 animate-slide-in-up" style={{ animationDelay: `${navLinks.length * 75}ms`, animationFillMode: 'forwards' }}>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
            <a 
              href="#download" 
              onClick={() => setIsMenuOpen(false)} 
              className="w-full text-center mt-4 px-5 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 opacity-0 animate-slide-in-up"
              style={{ animationDelay: `${(navLinks.length + 1) * 75}ms`, animationFillMode: 'forwards' }}
            >
              Download
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
