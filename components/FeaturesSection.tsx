import React from 'react';
import { ICONS } from '../constants';
import AnimatedPlatypus from './AnimatedPlatypus';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }): React.ReactElement => {
  return (
    <div className="group bg-platypus-secondary dark:bg-platypus-dark-secondary p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="text-platypus-primary group-hover:text-platypus-accent mb-4 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-platypus-text dark:text-platypus-dark-text">{title}</h3>
      <p className="text-platypus-subtle dark:text-platypus-dark-subtle">{description}</p>
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