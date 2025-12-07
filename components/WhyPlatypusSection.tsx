
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
        className={`group cursor-pointer relative p-8 rounded-2xl transition-all duration-500 border h-full flex flex-col items-center text-center ${
            isActive 
                ? 'bg-white dark:bg-[#0c0c0c] border-platypus-primary/50 dark:border-platypus-primary/50 shadow-xl scale-105 z-10' 
                : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-[#0c0c0c]/50 opacity-80 hover:opacity-100 hover:scale-105'
        }`}
    >
        <div className={`flex-shrink-0 mb-6 transition-transform duration-500 ${isActive ? 'scale-125' : 'scale-100 group-hover:scale-110'}`}>
             <div className={isActive ? 'animate-logo-pulse' : ''}>
                 <AnimatedPlatypus 
                    mascotType={mascotType}
                    className="w-24 h-24"
                />
             </div>
        </div>
        <div>
             <h3 className={`text-2xl font-bold mb-3 transition-colors ${isActive ? 'text-platypus-primary' : 'text-platypus-text dark:text-platypus-dark-text'}`}>
                {title}
             </h3>
             <p className="text-base text-platypus-subtle dark:text-platypus-dark-subtle leading-relaxed">
                {description}
             </p>
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
    }, 4000); // Slower cycle for better readability

    return () => clearInterval(interval);
  }, [hoveredPillar]);

  // Use hovered pillar if available, otherwise use the auto-cycling one
  const activePillar = hoveredPillar || autoPillar;

  return (
    <section className="py-20 md:py-32 bg-platypus-secondary/70 dark:bg-platypus-dark-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-platypus-text dark:text-platypus-dark-text tracking-tight">Engineered for Excellence</h2>
          <p className="text-xl text-platypus-subtle dark:text-platypus-dark-subtle mt-6 max-w-3xl mx-auto">Platypus isn't just another tool. It's a finely tuned coding partner, continuously optimizing your workflow.</p>
        </div>
        
        <div className="flex flex-col gap-16">
            {/* Top Row: Cards Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
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
                    title="Developer-Centric" 
                    description="Built by developers, for developers, with a seamless UX that integrates perfectly into your IDE."
                    isActive={activePillar === 'design'}
                    onMouseEnter={() => setHoveredPillar('design')}
                    onMouseLeave={() => setHoveredPillar(null)}
                />
            </div>

            {/* Bottom Row: Full Width Code Window */}
            <div className="w-full h-[450px] md:h-[550px] shadow-2xl rounded-lg overflow-hidden">
                <InteractiveCodeWindow activePillar={activePillar} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPlatypusSection;
