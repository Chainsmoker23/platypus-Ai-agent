
import React, { useEffect, useState } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';
import { ICONS } from '../constants';

interface HeroSectionProps {
  onNavigateToPlayground: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToPlayground }): React.ReactElement => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden bg-platypus-background dark:bg-platypus-dark-background"
        aria-labelledby="hero-heading"
    >
        
        {/* Futuristic Background Effects - Parallax & Animation Combined */}
        {/* Container handles the parallax transform */}
        <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
                transform: `translateY(${offsetY * 0.4}px)`,
                opacity: Math.max(0, 1 - offsetY / 800) // Fade out as we scroll deep
            }}
            aria-hidden="true"
        >
             {/* Inner div handles the continuous grid animation */}
             <div className="cyber-grid w-full h-full animate-grid-move"></div>
        </div>
        
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div 
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow"
                style={{ transform: `translateY(${offsetY * 0.2}px)` }}
            ></div>
            <div 
                className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" 
                style={{ 
                    animationDelay: '2s',
                    transform: `translateY(${offsetY * -0.1}px)` // Moves slightly upward for contrast
                }}
            ></div>
        </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left animate-fade-in-up">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-platypus-primary/30 bg-platypus-primary/5 dark:bg-platypus-primary/10 backdrop-blur-md">
                    <span className="text-sm font-semibold text-platypus-primary tracking-wide uppercase">v2.0 Now Available</span>
                </div>
                
                <h1 
                    id="hero-heading"
                    className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-platypus-text dark:text-platypus-dark-text leading-tight"
                >
                  Your Intelligent <br/>
                  <span 
                    className="glitch-text bg-clip-text text-transparent bg-gradient-to-r from-platypus-primary via-purple-400 to-pink-400 animate-gradient-x bg-[length:200%_auto] text-glow relative inline-block"
                    data-text="Coding Companion"
                  >
                    Coding Companion
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-platypus-subtle dark:text-platypus-dark-subtle mt-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Harness the power of an AI that understands your entire project context. From multi-file autonomous refactoring to intelligent diff reviews, Platypus evolves your workflow.
                </p>

                {/* Key Capability Highlights */}
                <div className="mt-8 space-y-4 max-w-lg mx-auto lg:mx-0">
                    <div className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="mt-1 bg-platypus-primary/10 p-1 rounded-full flex-shrink-0">
                            <svg className="w-4 h-4 text-platypus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-platypus-subtle dark:text-platypus-dark-subtle text-sm md:text-base text-left">
                            <span className="font-semibold text-platypus-text dark:text-platypus-dark-text">Full-Project Understanding:</span> Seamlessly indexes your entire repo for deeply context-aware suggestions.
                        </p>
                    </div>
                    <div className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <div className="mt-1 bg-platypus-primary/10 p-1 rounded-full flex-shrink-0">
                            <svg className="w-4 h-4 text-platypus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-platypus-subtle dark:text-platypus-dark-subtle text-sm md:text-base text-left">
                            <span className="font-semibold text-platypus-text dark:text-platypus-dark-text">Autonomous Agents:</span> Delegate complex refactoring and features to AI that writes code across multiple files.
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center lg:justify-start">
                  <button 
                    className="px-8 py-4 bg-platypus-primary hover:bg-violet-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                    aria-label="Download the Platypus Visual Studio Code Extension"
                  >
                    <span>Download Extension</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                  <button 
                    onClick={onNavigateToPlayground} 
                    className="px-8 py-4 bg-white/5 dark:bg-white/5 border border-platypus-subtle/20 hover:bg-white/10 text-platypus-text dark:text-platypus-dark-text font-bold rounded-full backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                    aria-label="Try Platypus Live in the Playground"
                  >
                    <span>Try It Live</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-platypus-subtle dark:text-platypus-dark-subtle" role="list">
                   <div className="flex items-center gap-2" role="listitem">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></div>
                      <span>Local Mode</span>
                   </div>
                   <div className="flex items-center gap-2" role="listitem">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.5s'}} aria-hidden="true"></div>
                      <span>Privacy First</span>
                   </div>
                   <div className="flex items-center gap-2" role="listitem">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '1s'}} aria-hidden="true"></div>
                      <span>Context Aware</span>
                   </div>
                </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative mt-12 lg:mt-0 perspective-1000" aria-hidden="true">
                {/* Code Universe 3D Orbits */}
                <div className="absolute w-[400px] h-[400px] preserve-3d">
                    {/* Ring 1 */}
                    <div className="absolute top-1/2 left-1/2 w-full h-full border border-platypus-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-orbit-spin">
                        <div className="absolute top-0 left-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 text-xs text-platypus-primary font-mono">{`{}`}</div>
                    </div>
                    {/* Ring 2 */}
                    <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] border border-blue-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-orbit-spin-reverse">
                         <div className="absolute bottom-0 left-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center -translate-x-1/2 translate-y-1/2 text-xs text-blue-400 font-mono">{`</>`}</div>
                    </div>
                    {/* Ring 3 */}
                    <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] border border-green-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-orbit-spin" style={{ animationDuration: '15s' }}>
                         <div className="absolute left-0 top-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 text-xs text-green-400 font-mono">fn</div>
                    </div>
                </div>

                {/* Decoration behind mascot - Parallaxed slightly */}
                <div 
                    className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-green-400/10 to-violet-500/10 rounded-full filter blur-3xl animate-subtle-float" 
                    style={{ animationDuration: '10s', transform: `translateY(${offsetY * -0.05}px)` }}
                ></div>
                
                <AnimatedPlatypus 
                    mascotType="hero"
                    className="w-full max-w-xs sm:max-w-sm lg:max-w-md animate-subtle-float drop-shadow-2xl relative z-10"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
