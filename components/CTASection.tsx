import React from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const CTASection: React.FC = (): React.ReactElement => {
  return (
    <section id="download" className="bg-platypus-primary/10 dark:bg-platypus-primary/20">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="relative max-w-4xl mx-auto text-center bg-white dark:bg-platypus-dark-secondary p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden">
           <div className="absolute -top-10 -left-10 w-32 h-32 md:w-48 md:h-48 bg-platypus-accent/10 rounded-full -z-0"></div>
           <div className="absolute -bottom-16 -right-10 w-48 h-48 md:w-64 md:h-64 bg-platypus-primary/10 rounded-full -z-0"></div>
           <div className="relative z-10 flex flex-col items-center">
              <AnimatedPlatypus mascotType="wavingSkateboard" className="w-32 h-32 md:w-40 md:h-40 mb-4" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Ready to Code Smarter?</h2>
              <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-xl mx-auto">
                Join thousands of developers who are shipping faster and writing better code. Download the extension and start your journey with Platypus today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button className="px-8 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Download for VS Code
                </button>
                <button className="px-8 py-3 bg-platypus-secondary dark:bg-platypus-dark-background text-platypus-text dark:text-platypus-dark-text font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  View All Integrations
                </button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;