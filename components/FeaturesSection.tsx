
import React, { useRef, useState, MouseEvent } from 'react';
import { ICONS } from '../constants';
import AnimatedPlatypus from './AnimatedPlatypus';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }): React.ReactElement => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on cursor position relative to center
    const rotateX = ((y - centerY) / centerY) * -10; // Max -10 to 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
        className="group relative h-full perspective-1000" 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
    >
        <div 
            ref={cardRef}
            className="relative h-full transition-transform duration-100 ease-linear preserve-3d"
            style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
            }}
        >
            {/* Holographic Sheen Layer */}
            <div 
                className="absolute inset-0 rounded-2xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`
                }}
            />

            {/* Gradient Border Layer */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-platypus-primary to-blue-600 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-500 blur-sm group-hover:blur group-hover:animate-gradient-xy"></div>
            
            {/* Main Card Content */}
            <div className="relative bg-platypus-secondary dark:bg-platypus-dark-secondary p-6 rounded-2xl shadow-md h-full flex flex-col items-start border border-transparent group-hover:border-white/10 dark:group-hover:border-black/10 transform-style-3d">
                <div 
                    className="text-platypus-primary group-hover:text-platypus-accent mb-4 transition-colors duration-300 transform group-hover:scale-110"
                    style={{ transform: `translateZ(30px)` }}
                >
                    {icon}
                </div>
                <h3 
                    className="text-xl font-bold mb-2 text-platypus-text dark:text-platypus-dark-text"
                    style={{ transform: `translateZ(20px)` }}
                >
                    {title}
                </h3>
                <p 
                    className="text-platypus-subtle dark:text-platypus-dark-subtle"
                    style={{ transform: `translateZ(10px)` }}
                >
                    {description}
                </p>
            </div>
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = (): React.ReactElement => {
  const features: FeatureCardProps[] = [
    {
      icon: ICONS.folder,
      title: 'Full-Project Understanding',
      description: 'Platypus indexes your entire codebase to provide context-aware suggestions and edits that respect your project\'s architecture.',
    },
    {
      icon: ICONS.agent,
      title: 'Autonomous Code Agents',
      description: 'Delegate complex tasks like refactoring or feature implementation to AI agents that perform coordinated, multi-file changes.',
    },
    {
      icon: ICONS.diff,
      title: 'Diff-Style Review',
      description: 'AI-generated changes are presented as clear diffs. You maintain full control, with the ability to accept or reject any modification.',
    },
    {
      icon: ICONS.autocomplete,
      title: 'Advanced Autocomplete',
      description: 'Get smart, multi-line code completions and inline assistance that understands the nuances of your code.',
    },
    {
      icon: ICONS.terminal,
      title: 'Integrated Tooling',
      description: 'Seamlessly integrates with your terminal and linter feedback to help debug issues and maintain code quality.',
    },
    {
      icon: ICONS.context,
      title: 'Deep Context Engine',
      description: 'Our reasoning engine analyzes the broader codebase to ensure that every suggestion is relevant, consistent, and high-quality.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-platypus-background dark:bg-platypus-dark-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 relative">
           <AnimatedPlatypus 
              mascotType="peeking" 
              className="hidden md:block w-32 h-32 absolute -top-16 -left-8 lg:left-24 animate-slide-in-from-left opacity-0"
            />
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Everything You Need to Code Faster</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-3xl mx-auto">Platypus is more than an autocomplete. It's a comprehensive AI assistant designed for professional developers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
