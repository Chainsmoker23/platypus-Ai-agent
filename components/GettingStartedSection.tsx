import React from 'react';
import { ICONS, VSCodeLogo } from '../constants';

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, icon }) => {
  return (
    <div className="group relative bg-platypus-secondary/50 dark:bg-platypus-dark-secondary/50 p-6 rounded-2xl text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
      <div className="absolute -top-5 w-12 h-12 bg-platypus-primary text-white font-bold text-2xl rounded-full flex items-center justify-center border-4 border-platypus-background dark:border-platypus-dark-background">
        {step}
      </div>
      <div className="mt-8 text-platypus-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-bold text-platypus-text dark:text-platypus-dark-text">{title}</h3>
      <p className="mt-2 text-platypus-subtle dark:text-platypus-dark-subtle">{description}</p>
    </div>
  );
};

const GettingStartedSection: React.FC = () => {
  const steps: StepCardProps[] = [
    {
      step: 1,
      title: 'Install Extension',
      description: 'Find Platypus in the VS Code Marketplace and click install. It takes just a few seconds.',
      icon: <VSCodeLogo className="w-12 h-12" />,
    },
    {
      step: 2,
      title: 'Open Your Project',
      description: 'Open any codebase and Platypus will automatically begin indexing your files for context.',
      icon: React.cloneElement(ICONS.folder, { className: "h-12 w-12" }),
    },
    {
      step: 3,
      title: 'Start Coding',
      description: 'Use the integrated chat, run an agent, or enjoy smart suggestions as you type. It’s that easy!',
      icon: React.cloneElement(ICONS.magicWand, { className: "h-12 w-12" }),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-platypus-background dark:bg-platypus-dark-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Get Started in 30 Seconds</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-2xl mx-auto">No complex setup. No configuration hassle. Just pure coding productivity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {steps.map((s, index) => (
            <div key={s.step} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`}}>
                <StepCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GettingStartedSection;