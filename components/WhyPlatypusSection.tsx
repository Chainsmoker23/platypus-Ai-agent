import React from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const StrengthCard: React.FC<{ mascotType: 'rocket' | 'lollipop' | 'laptop'; title: string; children: React.ReactNode }> = ({ mascotType, title, children }) => (
  <div className="bg-platypus-secondary p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
    <AnimatedPlatypus 
      mascotType={mascotType}
      className="w-40 h-40 md:w-48 md:h-48 mb-6"
    />
    <h3 className="text-2xl font-bold text-platypus-text mb-3">{title}</h3>
    <p className="text-platypus-subtle">{children}</p>
  </div>
);

const WhyPlatypusSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text">Engineered for Excellence</h2>
          <p className="text-lg text-platypus-subtle mt-4 max-w-3xl mx-auto">Platypus isn't just another tool. It's a finely tuned coding partner, built on three core pillars to elevate your development experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StrengthCard mascotType="rocket" title="Unmatched Speed">
            Optimized for performance, Platypus delivers suggestions and analysis in milliseconds. Our lightweight models and efficient indexing mean you get instant feedback without ever breaking your creative flow.
          </StrengthCard>
          <StrengthCard mascotType="lollipop" title="High Reliability">
            Tired of nonsensical AI suggestions? Our models are trained on curated, high-quality code and fine-tuned to understand context deeply. This results in accurate, dependable code that reduces errors and saves you debugging time.
          </StrengthCard>
          <StrengthCard mascotType="laptop" title="Developer-Centric Design">
            Built by developers, for developers. We focus on a seamless, intuitive UX that integrates perfectly into your workflow. From the diff-based review to customizable commands, every feature is designed to empower you.
          </StrengthCard>
        </div>
      </div>
    </section>
  );
};

export default WhyPlatypusSection;