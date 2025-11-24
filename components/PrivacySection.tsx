import React from 'react';
import PlatypusSleeping from './platypusSleeping';

const PrivacySection: React.FC = () => {
  return (
    <section id="privacy" className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="text-sm font-bold uppercase text-platypus-primary">Security & Privacy</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text mt-2">Your Code Stays Yours. <span className="text-platypus-accent">Period.</span></h2>
            <p className="text-lg text-platypus-subtle mt-4">
              We understand that your codebase is your most valuable asset. Platypus is designed with a privacy-first philosophy, ensuring your data is handled with the utmost care.
            </p>
            <div className="mt-6 p-6 bg-platypus-secondary rounded-xl">
                <h3 className="font-bold text-xl">Operate in Local Mode</h3>
                <p className="text-platypus-subtle mt-2">
                For enterprise teams and sensitive projects, enable our privacy-preserving local mode. All code processing and AI reasoning happens entirely on your machine, and no data ever leaves your environment. It's the ultimate peace of mind for security-conscious developers.
                </p>
            </div>
          </div>
          <div className="flex justify-center animate-subtle-bob">
            <PlatypusSleeping 
              className="w-2/3 md:w-full max-w-sm" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;