import React from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLineCap="round" strokeLineJoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const FeatureListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center space-x-3">
    <CheckIcon />
    <span className="text-platypus-subtle">{children}</span>
  </li>
);

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-platypus-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <AnimatedPlatypus mascotType="coins" className="w-40 h-40 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text">Choose Your Plan</h2>
          <p className="text-lg text-platypus-subtle mt-4 max-w-2xl mx-auto">Start for free, then upgrade for unlimited power. All plans come with our core promise of privacy and security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Hatchling Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-platypus-text">Hatchling</h3>
            <p className="mt-2 text-platypus-subtle">Perfect for trying out the core features.</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-platypus-text">Free</span>
              <span className="text-platypus-subtle"> / 1 Week</span>
            </div>
            <ul className="mt-6 space-y-4 flex-grow">
              <FeatureListItem>Core Autocomplete</FeatureListItem>
              <FeatureListItem>Basic Code Agents</FeatureListItem>
              <FeatureListItem>Limited Requests</FeatureListItem>
            </ul>
            <button className="mt-8 w-full px-6 py-3 bg-platypus-secondary text-platypus-text font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Start Free Trial
            </button>
          </div>

          {/* Ultimate Plan (Highlighted) */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-platypus-primary relative flex flex-col transform scale-105">
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-platypus-primary text-white text-sm font-bold rounded-full">Most Popular</span>
            </div>
            <h3 className="text-2xl font-bold text-platypus-text">Ultimate</h3>
            <p className="mt-2 text-platypus-subtle">For professionals who need it all.</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-platypus-text">$10</span>
              <span className="text-platypus-subtle"> / month</span>
            </div>
            <ul className="mt-6 space-y-4 flex-grow">
              <FeatureListItem>Everything in Pro</FeatureListItem>
              <FeatureListItem>Unlimited Agent Runs</FeatureListItem>
              <FeatureListItem>Privacy-Preserving Local Mode</FeatureListItem>
              <FeatureListItem>Beta Feature Access</FeatureListItem>
            </ul>
            <button className="mt-8 w-full px-6 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Unleash Ultimate
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-platypus-text">Pro</h3>
            <p className="mt-2 text-platypus-subtle">A massive boost for your daily workflow.</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-platypus-text">$5</span>
              <span className="text-platypus-subtle"> / month</span>
            </div>
            <ul className="mt-6 space-y-4 flex-grow">
              <FeatureListItem>Full-Project Context</FeatureListItem>
              <FeatureListItem>Advanced Code Agents</FeatureListItem>
              <FeatureListItem>Increased Request Limits</FeatureListItem>
              <FeatureListItem>Priority Support</FeatureListItem>
            </ul>
            <button className="mt-8 w-full px-6 py-3 bg-platypus-secondary text-platypus-text font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Go Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;