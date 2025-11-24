import React, { useState, useEffect } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

interface HeroSectionProps {
  onTryOnline: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTryOnline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`container mx-auto px-6 py-20 md:py-32 overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-platypus-primary to-blue-400">
            Platypus
          </h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-platypus-text">
            Your Intelligent Coding Companion
          </h2>
          <p className="text-lg text-platypus-subtle max-w-2xl mx-auto md:mx-0">
            Harness the power of an AI that understands your entire project. From multi-file intelligent edits and autonomous agents to inline smart suggestions and contextual reasoning, Platypus is built to supercharge your workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button className="px-8 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Download Extension
            </button>
            <button 
              onClick={onTryOnline}
              className="px-8 py-3 bg-platypus-secondary text-platypus-text font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Try Online
            </button>
          </div>
        </div>
        <div className="relative animate-fade-in-up [animation-delay:200ms] flex justify-center">
            <div className="absolute inset-0 -z-10 m-auto max-w-lg h-auto rounded-full bg-platypus-primary/20 blur-3xl animate-pulse-glow" />
            <AnimatedPlatypus 
              mascotType="hero" 
              className="w-2/3 md:w-full max-w-sm" 
            />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;