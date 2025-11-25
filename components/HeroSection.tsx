import React from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

interface HeroSectionProps {
  onNavigateToPlayground: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToPlayground }): React.ReactElement => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-platypus-secondary/30 dark:bg-platypus-dark-secondary/30">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-platypus-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-platypus-accent/20 rounded-full filter blur-3xl"></div>
        </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-platypus-text dark:text-platypus-dark-text">
                  Your Intelligent Coding Companion
                </h1>
                <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-6 max-w-lg mx-auto lg:mx-0">
                  Harness the power of an AI that understands your entire project. From multi-file intelligent edits and autonomous agents to inline smart suggestions, Platypus is built to supercharge your workflow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start">
                  <button className="px-8 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Download Extension
                  </button>
                  <button onClick={onNavigateToPlayground} className="px-8 py-3 bg-white dark:bg-platypus-dark-secondary text-platypus-text dark:text-platypus-dark-text font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Try It Live
                  </button>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
                <AnimatedPlatypus 
                    mascotType="hero"
                    className="w-full max-w-md animate-subtle-float"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;