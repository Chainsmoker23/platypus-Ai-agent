import React, { useState } from 'react';
import { PlatypusLogoSVG } from './PlatypusPlaceholders';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );


  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-platypus-background/95 backdrop-blur-xl' : 'bg-platypus-background/80 backdrop-blur-md'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlatypusLogoSVG className="w-10 h-10" />
          <span className="text-2xl font-bold text-platypus-text">Platypus</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-platypus-subtle hover:text-platypus-primary transition-colors">Features</a>
          <a href="#demo" className="text-platypus-subtle hover:text-platypus-primary transition-colors">Demo</a>
          <a href="#compare" className="text-platypus-subtle hover:text-platypus-primary transition-colors">Compare</a>
          <a href="#pricing" className="text-platypus-subtle hover:text-platypus-primary transition-colors">Pricing</a>
          <a href="#privacy" className="text-platypus-subtle hover:text-platypus-primary transition-colors">Privacy</a>
        </nav>
        <div className="flex items-center space-x-4">
           <a href="#download" className="px-5 py-2 bg-platypus-accent text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hidden md:block">
              Download
            </a>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-platypus-subtle hover:text-platypus-primary focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-platypus-background/95 backdrop-blur-xl animate-fade-in-up animation-duration-300">
          <nav className="flex flex-col items-center space-y-4 px-6 pb-6 pt-2">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary transition-colors text-lg">Features</a>
            <a href="#demo" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary transition-colors text-lg">Demo</a>
            <a href="#compare" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary transition-colors text-lg">Compare</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary transition-colors text-lg">Pricing</a>
            <a href="#privacy" onClick={() => setIsMenuOpen(false)} className="text-platypus-subtle hover:text-platypus-primary transition-colors text-lg">Privacy</a>
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