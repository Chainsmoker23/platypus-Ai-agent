
import React, { useState, useEffect } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';
import InteractiveCodeWindow from './InteractiveCodeWindow';

type Pillar = 'speed' | 'reliability' | 'design';

interface StrengthCardProps {
  mascotType: 'rocket' | 'lollipop' | 'laptop';
  title: string;
  description: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const StrengthCard: React.FC<StrengthCardProps> = ({ mascotType, title, description, isActive, onMouseEnter, onMouseLeave }): React.ReactElement => {
  return (
    <div 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
        className={`group cursor-pointer relative p-4 rounded-xl transition-all duration-500 border ${
            isActive 
                ? 'bg-white dark:bg-platypus-dark-secondary border-platypus-primary/50 shadow-lg scale-[1.02]' 
                : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-platypus-dark-secondary/50 opacity-70 hover:opacity-100'
        }`}
    >
        <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}>
                 <div className={isActive ? 'animate-logo-pulse' : ''}>
                     <AnimatedPlatypus 
                        mascotType={mascotType}
                        className="w-14 h-14 md:w-16 md:h-16"
                    />
                 </div>
            </div>
            <div>
                 <h3 className={`text-lg md:text-xl font-bold mb-1 transition-colors ${isActive ? 'text-platypus-primary' : 'text-platypus-text dark:text-platypus-dark-text'}`}>
                    {title}
                 </h3>
                 <p className="text-sm md:text-base text-platypus-subtle dark:text-platypus-dark-subtle leading-relaxed">
                    {description}
                 </p>
            </div>
        </div>
    </div>
  );
};

const WhyPlatypusSection: React.FC = (): React.ReactElement => {
  const [hoveredPillar, setHoveredPillar] = useState<Pillar | null>(null);
  const [autoPillar, setAutoPillar] = useState<Pillar>('speed');

  // Auto-cycle through pillars if none are hovered to create "continuous live coding" effect
  useEffect(() => {
    const interval = setInterval(() => {
        if (!hoveredPillar) {
            setAutoPillar(current => {
                if (current === 'speed') return 'reliability';
                if (current === 'reliability') return 'design';
                return 'speed';
            });
        }
    }, 3500); // Cycle every 3.5 seconds

    return () => clearInterval(interval);
  }, [hoveredPillar]);

  // Use hovered pillar if available, otherwise use the auto-cycling one
  const activePillar = hoveredPillar || autoPillar;

  return (
    <section className="py-16 md:py-24 bg-platypus-secondary/70 dark:bg-platypus-dark-background/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Engineered for Excellence</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-3xl mx-auto">Platypus isn't just another tool. It's a finely tuned coding partner, continuously optimizing your workflow.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
                <StrengthCard 
                    mascotType="rocket" 
                    title="Unmatched Speed" 
                    description="Optimized for performance, Platypus delivers suggestions and analysis in milliseconds."
                    isActive={activePillar === 'speed'}
                    onMouseEnter={() => setHoveredPillar('speed')}
                    onMouseLeave={() => setHoveredPillar(null)}
                />
                <StrengthCard 
                    mascotType="lollipop" 
                    title="High Reliability" 
                    description="Trained on curated, high-quality code, our models provide accurate suggestions that reduce errors."
                    isActive={activePillar === 'reliability'}
                    onMouseEnter={() => setHoveredPillar('reliability')}
                    onMouseLeave={() => setHoveredPillar(null)}
                />
                <StrengthCard 
                    mascotType="laptop" 
                    title="Developer-Centric Design" 
                    description="Built by developers, for developers, with a seamless UX that integrates perfectly into your IDE."
                    isActive={activePillar === 'design'}
                    onMouseEnter={() => setHoveredPillar('design')}
                    onMouseLeave={() => setHoveredPillar(null)}
                />
            </div>
            <div className="lg:col-span-7 h-[350px] md:h-[400px] w-full">
                <InteractiveCodeWindow activePillar={activePillar} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPlatypusSection;
