import React from 'react';
import { LANGUAGE_LOGOS, VSCodeLogo } from '../constants';

interface LanguageIconProps {
  logoUrl: string;
  name: string;
}

const LanguageIcon: React.FC<LanguageIconProps> = ({ logoUrl, name }): React.ReactElement => (
  <div className="group flex flex-col items-center justify-center gap-3 p-4 transition-transform duration-300 hover:scale-110" title={name}>
    <div className="w-14 h-14 flex items-center justify-center">
        <img src={logoUrl} alt={`${name} logo`} className="max-w-full max-h-full object-contain" />
    </div>
    <span className="text-sm font-medium text-platypus-subtle dark:text-platypus-dark-subtle group-hover:text-platypus-text dark:group-hover:text-platypus-dark-text transition-colors duration-300">{name}</span>
  </div>
);

const LanguagesSection: React.FC = (): React.ReactElement => {
  const languages = [
    { name: 'Python', logoUrl: LANGUAGE_LOGOS.python },
    { name: 'JavaScript', logoUrl: LANGUAGE_LOGOS.javascript },
    { name: 'TypeScript', logoUrl: LANGUAGE_LOGOS.typescript },
    { name: 'Node.js', logoUrl: LANGUAGE_LOGOS.nodejs },
    { name: 'React', logoUrl: LANGUAGE_LOGOS.react },
    { name: 'Express', logoUrl: LANGUAGE_LOGOS.express },
    { name: 'Java', logoUrl: LANGUAGE_LOGOS.java },
    { name: 'Solidity', logoUrl: LANGUAGE_LOGOS.solidity },
    { name: 'Rust', logoUrl: LANGUAGE_LOGOS.rust },
    { name: 'Go', logoUrl: LANGUAGE_LOGOS.go },
  ];

  return (
    <section className="py-16 md:py-20 bg-platypus-secondary dark:bg-platypus-dark-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Works With Your Favorite Languages & Frameworks</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-3xl mx-auto">
            Platypus is fluent in the most popular languages, frameworks, and tools, right out of the box.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-6 md:gap-x-10">
          {languages.map(lang => <LanguageIcon key={lang.name} {...lang} />)}
        </div>

        <div className="mt-20 max-w-4xl mx-auto text-center bg-white dark:bg-platypus-dark-background p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-platypus-primary/10 rounded-full -z-0"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-platypus-primary mb-4">
              <VSCodeLogo className="w-16 h-16" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Seamlessly Integrates with Your Editor</h3>
            <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-xl mx-auto">
              Get all the power of Platypus, including multi-file context and autonomous agents, directly in Visual Studio Code.
            </p>
            <button className="mt-8 px-8 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get the VS Code Plugin
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;