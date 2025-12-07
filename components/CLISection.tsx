
import React, { useState, useEffect, useRef } from 'react';
import { CopyIcon, CheckIcon } from './ide/Icons';
import AnimatedPlatypus from './AnimatedPlatypus';

type PackageManager = 'npm' | 'yarn' | 'pnpm';

const commands: Record<PackageManager, string> = {
  npm: 'npm install -g platypus-cli',
  yarn: 'yarn global add platypus-cli',
  pnpm: 'pnpm add -g platypus-cli',
};

const installSteps = [
  { text: 'Fetching packages...', duration: 500 },
  { text: 'Resolving dependencies...', duration: 700 },
  { text: 'Linking binaries...', duration: 400 },
];

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const totalBlocks = 20;
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;

    return (
        <div className="flex items-center text-green-400">
            <span>[</span>
            <span>{'█'.repeat(filledBlocks)}</span>
            <span className="text-gray-600">{'-'.repeat(emptyBlocks)}</span>
            <span>] {progress}%</span>
        </div>
    );
};

const CLISection: React.FC = () => {
  const [activeManager, setActiveManager] = useState<PackageManager>('npm');
  const [isInstalling, setIsInstalling] = useState(false);
  const [installLog, setInstallLog] = useState<{ text: string, status: 'pending' | 'done' }[]>([]);
  const [progress, setProgress] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState(commands.npm);
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => timeoutRef.current.forEach(clearTimeout);
  }, []);
  
  // Live typewriter effect for command
  useEffect(() => {
    if (isInstalling) return;
    
    timeoutRef.current.forEach(clearTimeout);
    let i = 0;
    setDisplayedCommand('');
    const type = () => {
      if (i < commands[activeManager].length) {
        setDisplayedCommand(prev => prev + commands[activeManager].charAt(i));
        i++;
        const id = window.setTimeout(type, 30);
        timeoutRef.current.push(id);
      }
    };
    type();
  }, [activeManager, isInstalling]);

  const handleCopyAndInstall = async () => {
    if (isInstalling) return;

    navigator.clipboard.writeText(commands[activeManager]);
    setIsCopied(true);
    const copyTimeout = setTimeout(() => setIsCopied(false), 2000);
    timeoutRef.current.push(copyTimeout);
    
    setIsInstalling(true);
    setInstallLog([]);
    setProgress(0);

    // Run installation simulation
    let currentProgress = 0;
    for (let i = 0; i < installSteps.length; i++) {
        const step = installSteps[i];
        setInstallLog(prev => [...prev, { text: step.text, status: 'pending' }]);
        
        await new Promise(res => {
            const id = window.setTimeout(res, step.duration);
            timeoutRef.current.push(id);
        });

        currentProgress += (100 - currentProgress) * (i === installSteps.length - 1 ? 1 : 0.5); // Accelerate progress
        setProgress(Math.round(currentProgress));
        setInstallLog(prev => {
            const newLog = [...prev];
            newLog[i].status = 'done';
            return newLog;
        });
    }

    // Final success message
    const successMessage = "Installation Successful! Platypus is ready.";
    setInstallLog(prev => [...prev, { text: successMessage, status: 'done' }]);
    setProgress(100);

    // Reset after a delay
    const resetTimeout = setTimeout(() => {
        setIsInstalling(false);
    }, 2500);
    timeoutRef.current.push(resetTimeout);
  };

  return (
    <section id="cli-install" className="py-16 md:py-24 bg-platypus-secondary dark:bg-platypus-dark-background/70 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
                <AnimatedPlatypus mascotType="laptop" className="w-40 h-40 mx-auto lg:mx-0 mb-4" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">Install via CLI</h2>
                <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-lg mx-auto lg:mx-0">
                    Get started in seconds. Install the Platypus CLI globally to bring project-wide intelligence to your local workflow.
                </p>
            </div>
            
            <div className="relative">
                <div className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl bg-slate-900/70 dark:bg-black/50 backdrop-blur-md border border-white/10">
                    <div className="h-9 bg-black/30 flex items-center px-4 justify-between rounded-t-xl">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex space-x-1 bg-black/30 p-1 rounded-md">
                            {(['npm', 'yarn', 'pnpm'] as PackageManager[]).map((manager) => (
                                <button
                                key={manager}
                                onClick={() => !isInstalling && setActiveManager(manager)}
                                disabled={isInstalling}
                                className={`px-3 py-0.5 text-xs font-semibold rounded transition-colors ${
                                    activeManager === manager
                                    ? 'bg-platypus-primary text-white'
                                    : 'text-gray-400 hover:bg-white/10'
                                }`}
                                >
                                {manager}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 text-sm md:text-base font-mono text-white min-h-[220px]">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-cyan-400 flex-shrink-0 select-none">$</span>
                            <span className="flex-grow overflow-x-auto whitespace-nowrap">{displayedCommand}</span>
                            {!isInstalling && <span className="w-2 h-4 bg-orange-400 animate-code-blink" />}
                            <button
                                onClick={handleCopyAndInstall}
                                disabled={isInstalling}
                                className="flex-shrink-0 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Copy command and run installation simulation"
                            >
                                {isCopied && !isInstalling ? <CheckIcon /> : <CopyIcon />}
                            </button>
                        </div>
                        
                        {isInstalling && (
                            <div className="space-y-2 pt-2 border-t border-white/10">
                                {installLog.map((line, index) => (
                                    <div key={index} className="flex items-center">
                                        {line.status === 'pending' ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <span className="text-green-400 mr-2">✓</span>
                                        )}
                                        <span className={`${line.text.includes('Successful') ? 'text-green-400 font-bold' : 'text-gray-400'}`}>
                                            {line.text}
                                        </span>
                                    </div>
                                ))}
                                {progress > 0 && <ProgressBar progress={progress} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CLISection;