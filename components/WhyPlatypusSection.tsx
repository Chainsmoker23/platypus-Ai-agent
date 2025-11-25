import React, { useState } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';
import InteractiveCodeWindow from './InteractiveCodeWindow';

type Pillar = 'speed' | 'reliability' | 'design';

interface StrengthCardProps {
  mascotType: 'rocket' | 'lollipop' | 'laptop';
  title: string;
  isActive: boolean;
  children: React.ReactNode;
}

const StrengthCard: React.FC<StrengthCardProps> = ({ mascotType, title, children, isActive }): React.ReactElement => {
  return (
    <div className={`bg-white dark:bg-platypus-dark-secondary p-6 md:p-8 rounded-2xl transition-all duration-300 ${isActive ? 'shadow-2xl -translate-y-2 ring-2 ring-platypus-primary' : 'shadow-lg border border-transparent hover:border-platypus-primary/50 dark:hover:border-platypus-primary/70'}`}>
        <div className="flex items-center gap-4">
            <AnimatedPlatypus 
                mascotType={mascotType}
                className="w-20 h-20 flex-shrink-0"
            />
            <div>
                 <h3 className="text-xl md:text-2xl font-bold text-platypus-text dark:text-platypus-dark-text mb-2">{title}</h3>
                 <p className="text-platypus-subtle dark:text-platypus-dark-subtle text-sm md:text-base">{children}</p>
            </div>
        </div>
    </div>
  );
};

const WhyPlatypusSection: React.FC = (): React.ReactElement => {
  const [activePillar, setActivePillar] = useState<Pillar | null>(null);

  return (
    <section className="py-16 md:py-24 bg-platypus-secondary/70 dark:bg-platypus-dark-background/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Engineered for Excellence</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-3xl mx-auto">Platypus isn't just another tool. It's a finely tuned coding partner, built on three core pillars to elevate your development experience.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
                <div onMouseEnter={() => setActivePillar('speed')} onMouseLeave={() => setActivePillar(null)}>
                    <StrengthCard mascotType="rocket" title="Unmatched Speed" isActive={activePillar === 'speed'}>
                        Optimized for performance, Platypus delivers suggestions and analysis in milliseconds, keeping you in the creative flow.
                    </StrengthCard>
                </div>
                <div onMouseEnter={() => setActivePillar('reliability')} onMouseLeave={() => setActivePillar(null)}>
                    <StrengthCard mascotType="lollipop" title="High Reliability" isActive={activePillar === 'reliability'}>
                        Trained on curated, high-quality code, our models provide accurate suggestions that reduce errors and debugging time.
                    </StrengthCard>
                </div>
                <div onMouseEnter={() => setActivePillar('design')} onMouseLeave={() => setActivePillar(null)}>
                    <StrengthCard mascotType="laptop" title="Developer-Centric Design" isActive={activePillar === 'design'}>
                        Built by developers, for developers, with a seamless UX that integrates perfectly into your existing workflow.
                    </StrengthCard>
                </div>
            </div>
            <div className="lg:h-[450px]">
                <InteractiveCodeWindow activePillar={activePillar} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPlatypusSection;