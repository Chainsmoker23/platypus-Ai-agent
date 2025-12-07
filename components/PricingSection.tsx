
import React, { useRef, useState, MouseEvent } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const CheckIcon: React.FC = (): React.ReactElement => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

interface FeatureListItemProps {
  children: React.ReactNode;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ children }): React.ReactElement => (
  <li className="flex items-center space-x-3">
    <CheckIcon />
    <span className="text-platypus-subtle dark:text-platypus-dark-subtle">{children}</span>
  </li>
);


interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, description, price, period, features, buttonText, isPopular = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Reduced rotation factor from 8 to 4 for gentler tilt
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Replaced 'animate-pulse-glow' (which scales aggressively) with 'animate-subtle-pulse'
  const popularClasses = isPopular ? 'border-2 border-platypus-primary relative animate-subtle-pulse' : 'border border-gray-200 dark:border-gray-800';

  return (
    <div 
        className="group relative h-full perspective-1000"
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
    >
        <div
            ref={cardRef}
            className={`relative h-full transition-transform duration-100 ease-out preserve-3d bg-white dark:bg-[#0c0c0c] p-8 rounded-2xl shadow-lg flex flex-col ${popularClasses}`}
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
            {isPopular && (
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-platypus-primary text-white text-sm font-bold rounded-full">Most Popular</span>
              </div>
            )}
            
            {/* Holographic Sheen */}
            <div 
                className="absolute inset-0 rounded-2xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)`
                }}
            />
            
            {/* Gradient Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 dark:from-pink-600 dark:via-platypus-primary dark:to-blue-600 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-500 blur-sm group-hover:blur group-hover:animate-gradient-xy"></div>

            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-platypus-text dark:text-platypus-dark-text">{title}</h3>
              <p className="mt-2 text-platypus-subtle dark:text-platypus-dark-subtle">{description}</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">{price}</span>
                <span className="text-platypus-subtle dark:text-platypus-dark-subtle"> {period}</span>
              </div>
              <ul className="mt-6 space-y-4 flex-grow">
                {features.map((feature, i) => <FeatureListItem key={i}>{feature}</FeatureListItem>)}
              </ul>
              <button className={`mt-8 w-full px-6 py-3 font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  isPopular 
                    ? 'bg-platypus-accent text-white' 
                    : 'bg-platypus-secondary dark:bg-gray-800 text-platypus-text dark:text-platypus-dark-text hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
                {buttonText}
              </button>
            </div>
        </div>
    </div>
  );
};

const PricingSection: React.FC = (): React.ReactElement => {
  return (
    <section id="pricing" className="py-16 md:py-20 dark:bg-platypus-dark-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <AnimatedPlatypus mascotType="coins" className="w-40 h-40 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Choose Your Plan</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-2xl mx-auto">Start for free, then upgrade for unlimited power. All plans come with our core promise of privacy and security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          <PricingCard
            title="Hatchling"
            description="Perfect for trying out the core features."
            price="Free"
            period="/ 1 Week"
            features={['Core Autocomplete', 'Basic Code Agents', 'Limited Requests']}
            buttonText="Start Free Trial"
          />
          <PricingCard
            title="Ultimate"
            description="For professionals who need it all."
            price="$10"
            period="/ month"
            features={['Everything in Pro', 'Unlimited Agent Runs', 'Privacy-Preserving Local Mode', 'Beta Feature Access']}
            buttonText="Unleash Ultimate"
            isPopular={true}
          />
          <PricingCard
            title="Pro"
            description="A massive boost for your daily workflow."
            price="$5"
            period="/ month"
            features={['Full-Project Context', 'Advanced Code Agents', 'Increased Request Limits', 'Priority Support']}
            buttonText="Go Pro"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
