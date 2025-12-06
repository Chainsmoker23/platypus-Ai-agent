import React, { useRef, useEffect, useState } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const journeySteps = [
  {
    title: 'Project Indexing',
    description: "Platypus securely scans your project's structure and files, building an intelligent map of your codebase without sending your code anywhere.",
    visual: (
      <div className="w-full h-full p-2">
        <div className="flex justify-between items-end h-full">
          {[20, 40, 30, 50, 25].map((h, i) => (
            <div key={i} className="w-3 bg-platypus-primary/20 rounded-t-sm" style={{ height: `${h}%` }}>
              <div className="w-full bg-platypus-primary/80 rounded-t-sm animate-code-line-anim" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i*100}ms` }} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Contextual Understanding',
    description: 'Using its codebase map, it understands the relationships between components, functions, and types, enabling truly context-aware suggestions.',
    visual: (
      <div className="w-full h-full p-2 flex justify-center items-center">
        <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="5" fill="#0D92F4"/>
            {[0, 72, 144, 216, 288].map(angle => (
                <g key={angle}>
                    <line x1="25" y1="25" x2={25 + 20 * Math.cos(angle * Math.PI / 180)} y2={25 + 20 * Math.sin(angle * Math.PI / 180)} stroke="#0D92F4" strokeWidth="0.5" className="opacity-0 animate-fade-in-subtle" style={{ animationDelay: `${angle/2}ms`}}/>
                    <circle cx={25 + 20 * Math.cos(angle * Math.PI / 180)} cy={25 + 20 * Math.sin(angle * Math.PI / 180)} r="3" fill="#0D92F4" className="opacity-0 animate-slide-in-up" style={{ animationDelay: `${angle/2}ms`}}/>
                </g>
            ))}
        </svg>
      </div>
    ),
  },
  {
    title: 'Intelligent Generation',
    description: "Whether it's a new feature or a refactor, Platypus generates clean, idiomatic code that aligns with your project's existing patterns and conventions.",
    visual: (
        <div className="w-full h-full p-2 font-mono text-xs text-platypus-primary/60">
            <p className="animate-code-line-anim [animation-delay:100ms] opacity-0">&gt; Generate component...</p>
            <p className="animate-code-line-anim [animation-delay:300ms] opacity-0">&gt; Apply styles...</p>
            <p className="animate-code-line-anim [animation-delay:500ms] opacity-0">&gt; Create storybook...</p>
        </div>
    ),
  },
  {
    title: 'Automated Testing',
    description: "To ensure reliability, Platypus can automatically generate unit and integration tests for the code it produces, verifying its correctness.",
    visual: (
        <div className="w-full h-full p-2 font-mono text-xs">
            <p className="text-green-500 animate-code-line-anim [animation-delay:100ms] opacity-0">✓ PASS: src/components/Button.test.js</p>
            <p className="text-green-500 animate-code-line-anim [animation-delay:300ms] opacity-0">✓ PASS: src/utils/helpers.test.js</p>
        </div>
    ),
  },
  {
    title: 'Ready for Review',
    description: "Finally, it presents all changes as a clear, easy-to-review diff, giving you full control to accept, reject, or request modifications.",
    visual: (
        <div className="w-full h-full p-2 font-mono text-xs">
            <p className="text-green-500 animate-code-line-anim [animation-delay:100ms] opacity-0">+ import {'{ NewIcon }'} from './icons';</p>
            <p className="text-red-500 animate-code-line-anim [animation-delay:300ms] opacity-0">- {'<button>Submit</button>'}</p>
            <p className="text-green-500 animate-code-line-anim [animation-delay:500ms] opacity-0">+ {'<Button icon={<NewIcon />}>Submit</Button>'}</p>
        </div>
    ),
  },
];

const JourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-step-index') || '0', 10);
            setActiveStep(index);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    stepsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepsRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-platypus-secondary dark:bg-platypus-dark-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">The Platypus Journey</h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-3xl mx-auto">From a simple prompt to a pull request, see how Platypus thinks and works with your project.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative pl-10">
                <div className="absolute top-0 left-0 h-full w-1 bg-platypus-primary/20 rounded-full">
                    <div 
                        className="absolute top-0 left-0 w-full bg-platypus-primary transition-all duration-500 ease-out rounded-full" 
                        style={{ height: `${((activeStep) / (journeySteps.length - 1)) * 100}%` }}
                    />
                </div>
                <div className="space-y-24">
                    {journeySteps.map((step, index) => (
                        <div 
                            key={index}
                            ref={el => { stepsRefs.current[index] = el; }} 
                            data-step-index={index}
                            className="relative"
                        >
                            <div className={`absolute -left-12 top-0 w-5 h-5 rounded-full border-4 border-platypus-secondary dark:border-platypus-dark-secondary transition-all duration-300 ${activeStep >= index ? 'bg-platypus-primary animate-glow' : 'bg-platypus-primary/30'}`}></div>
                            <h3 className={`text-2xl font-bold transition-colors duration-300 ${activeStep >= index ? 'text-platypus-text dark:text-platypus-dark-text' : 'text-platypus-subtle dark:text-platypus-dark-subtle'}`}>{step.title}</h3>
                            <p className={`mt-2 text-platypus-subtle dark:text-platypus-dark-subtle transition-opacity duration-300 ${activeStep >= index ? 'opacity-100' : 'opacity-60'}`}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky top-28 hidden lg:block">
                <div className="relative bg-platypus-background dark:bg-platypus-dark-background/50 rounded-2xl shadow-xl border border-platypus-primary/20 h-80">
                   {journeySteps.map((step, index) => (
                       <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-0'}`}>
                           {step.visual}
                       </div>
                   ))}
                </div>
                <div className="mt-8 flex items-center gap-4 p-4 bg-white/50 dark:bg-platypus-dark-secondary/50 rounded-2xl backdrop-blur-sm">
                    <AnimatedPlatypus mascotType="explorer" className="w-24 h-24 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-platypus-text dark:text-platypus-dark-text">Your AI Navigator</h4>
                        <p className="text-sm text-platypus-subtle dark:text-platypus-dark-subtle">Platypus explores your code's complexities so you can focus on the destination.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;