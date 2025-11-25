import React from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const Check: React.FC = (): React.ReactElement => <span className="text-green-500 text-2xl">✔</span>;
const Cross: React.FC = (): React.ReactElement => <span className="text-red-500 text-2xl">✖</span>;
const Partial: React.FC<{ text: string }> = ({ text }): React.ReactElement => <span className="text-yellow-500" title={text}>Partial</span>;


const ComparisonSection: React.FC = (): React.ReactElement => {
  const features = [
    { feature: 'Full-Project Context', platypus: <Check />, cursor: <Check />, qodo: <Partial text="File-level context" /> },
    { feature: 'Autonomous Multi-File Agents', platypus: <Check />, cursor: <Partial text="Manual multi-file edits" />, qodo: <Cross /> },
    { feature: 'Accept/Reject Diff Workflow', platypus: <Check />, cursor: <Check />, qodo: <Cross /> },
    { feature: 'Privacy-Preserving Local Mode', platypus: <Check />, cursor: <Cross />, qodo: <Cross /> },
    { feature: 'Terminal & Linter Integration', platypus: <Check />, cursor: <Partial text="Terminal only" />, qodo: <Partial text="Linter only" /> },
    { feature: 'Extensible Command API', platypus: <Check />, cursor: <Cross />, qodo: <Cross /> },
  ];

  return (
    <section id="compare" className="py-16 md:py-20 bg-platypus-secondary dark:bg-platypus-dark-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 relative">
           <AnimatedPlatypus 
              mascotType="clipboard" 
              className="hidden md:block w-40 h-40 absolute -top-20 -right-4 lg:right-32 animate-fade-in-up opacity-0 [animation-delay:200ms]"
            />
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">How Platypus Compares</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-3xl mx-auto">A neutral, descriptive look at how Platypus stacks up against other AI coding tools.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="overflow-x-auto rounded-xl shadow-lg border border-platypus-subtle/20 dark:border-gray-700">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-platypus-secondary dark:bg-platypus-dark-background/50">
                <tr>
                  <th className="p-4 font-bold text-platypus-text dark:text-platypus-dark-text tracking-wide">Feature</th>
                  <th className="p-4 font-bold text-platypus-text dark:text-platypus-dark-text tracking-wide text-center">Platypus</th>
                  <th className="p-4 font-bold text-platypus-text dark:text-platypus-dark-text tracking-wide text-center">Cursor</th>
                  <th className="p-4 font-bold text-platypus-text dark:text-platypus-dark-text tracking-wide text-center">Qodo</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-platypus-dark-secondary">
                {features.map((item) => (
                  <tr key={item.feature} className="border-t border-platypus-subtle/20 dark:border-gray-700">
                    <td className="p-4 font-semibold text-platypus-text dark:text-platypus-dark-text">{item.feature}</td>
                    <td className="p-4 text-center bg-platypus-secondary/60 dark:bg-platypus-dark-background/60">{item.platypus}</td>
                    <td className="p-4 text-center">{item.cursor}</td>
                    <td className="p-4 text-center">{item.qodo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;