
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
  { text: 'Resolving packages...', duration: 400 },
  { text: 'Fetching manifest...', duration: 300 },
  { text: 'Linking dependencies...', duration: 600 },
  { text: 'Building native modules...', duration: 800 },
  { text: 'Verifying integrity...', duration: 400 },
];

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const totalBlocks = 25;
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;

    return (
        <div className="flex items-center text-xs md:text-sm font-mono mt-2">
            <span className="text-gray-500 mr-2">Progress:</span>
            <span className="text-green-500">{'█'.repeat(filledBlocks)}</span>
            <span className="text-gray-700">{'-'.repeat(emptyBlocks)}</span>
            <span className="ml-2 text-white">{progress}%</span>
        </div>
    );
};

// Syntax Highlighter Component
const CommandDisplay: React.FC<{ command: string }> = ({ command }) => {
    const parts = command.split(' ');
    return (
        <div className="font-mono text-sm md:text-base">
            <span className="text-blue-400 font-bold mr-2 select-none">$</span>
            {parts.map((part, i) => {
                let colorClass = 'text-white';
                if (['npm', 'yarn', 'pnpm'].includes(part)) colorClass = 'text-red-400 font-bold'; // npm is usually red in zsh themes
                else if (['install', 'add', 'global'].includes(part)) colorClass = 'text-yellow-400';
                else if (part.startsWith('-')) colorClass = 'text-gray-500';
                else if (part.includes('platypus')) colorClass = 'text-green-400';
                
                return <span key={i} className={`${colorClass} mr-2`}>{part}</span>;
            })}
        </div>
    );
};

const CLISection: React.FC = () => {
  const [activeManager, setActiveManager] = useState<PackageManager>('npm');
  const [isInstalling, setIsInstalling] = useState(false);
  const [installLog, setInstallLog] = useState<{ text: string, status: 'pending' | 'done' }[]>([]);
  const [progress, setProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cleanup timeouts
  useEffect(() => {
    return () => timeoutRef.current.forEach(clearTimeout);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [installLog, progress]);

  const handleCopyAndInstall = async () => {
    if (isInstalling) return;

    navigator.clipboard.writeText(commands[activeManager]);
    setIsCopied(true);
    const copyTimeout = window.setTimeout(() => setIsCopied(false), 2000);
    timeoutRef.current.push(copyTimeout);
    
    setIsInstalling(true);
    setInstallLog([]);
    setProgress(0);

    let currentProgress = 0;
    
    // Initial Start
    setInstallLog([{ text: `Initializing ${activeManager}...`, status: 'done' }]);
    
    // Process steps
    for (let i = 0; i < installSteps.length; i++) {
        const step = installSteps[i];
        
        // Add pending step
        setInstallLog(prev => [...prev, { text: step.text, status: 'pending' }]);
        
        await new Promise(res => {
            const id = window.setTimeout(res, step.duration);
            timeoutRef.current.push(id);
        });

        // Mark previous as done
        setInstallLog(prev => {
            const newLog = [...prev];
            newLog[newLog.length - 1].status = 'done';
            return newLog;
        });

        // Increment progress
        currentProgress += (100 / installSteps.length);
        setProgress(Math.min(Math.round(currentProgress), 99));
    }

    // Finalize
    setProgress(100);
    setInstallLog(prev => [...prev, { text: 'Added 142 packages in 3.2s', status: 'done' }]);
    
    await new Promise(res => setTimeout(res, 500));
    setInstallLog(prev => [...prev, { text: 'Installation Successful!', status: 'done' }]);

    // Reset
    const resetTimeout = window.setTimeout(() => {
        setIsInstalling(false);
        setInstallLog([]);
        setProgress(0);
    }, 4000);
    timeoutRef.current.push(resetTimeout);
  };

  return (
    <section id="cli-install" className="py-20 md:py-28 bg-platypus-secondary dark:bg-platypus-dark-background overflow-hidden relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="flex justify-center lg:justify-start mb-6">
                    <AnimatedPlatypus mascotType="laptop" className="w-48 h-48" />
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-platypus-text dark:text-platypus-dark-text tracking-tight">
                    Power at Your <br/> <span className="text-platypus-primary">Fingertips</span>
                </h2>
                <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Install the Platypus CLI to bring full-project context, autonomous refactoring, and intelligent analysis directly to your local terminal.
                </p>
                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                    {/* Package Manager Tabs */}
                    <div className="inline-flex bg-white dark:bg-black/30 p-1 rounded-lg border border-gray-200 dark:border-white/10">
                        {(['npm', 'yarn', 'pnpm'] as PackageManager[]).map((manager) => (
                            <button
                                key={manager}
                                onClick={() => !isInstalling && setActiveManager(manager)}
                                disabled={isInstalling}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                    activeManager === manager
                                    ? 'bg-platypus-primary text-white shadow-md'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-platypus-primary dark:hover:text-white'
                                }`}
                            >
                                {manager}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Terminal Window - Flat & Realistic - Deep Black */}
            <div className="order-1 lg:order-2 relative group">
                {/* Glow effect behind terminal */}
                <div className="absolute -inset-1 bg-gradient-to-r from-platypus-primary to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                
                <div className="relative w-full max-w-2xl mx-auto rounded-lg shadow-2xl bg-[#0c0c0c] border border-gray-800 flex flex-col overflow-hidden">
                    {/* Terminal Header */}
                    <div className="h-10 bg-[#1F1F1F] flex items-center px-4 justify-between border-b border-gray-800">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-[#FF5F56] rounded-full"></div>
                            <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                            <div className="w-3 h-3 bg-[#27C93F] rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            bash — 80x24
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div 
                        ref={terminalRef}
                        className="p-6 font-mono text-sm md:text-base min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar bg-[#0c0c0c]"
                    >
                        {/* Static Command Line */}
                        <div className="flex items-center justify-between mb-4 group/cmd">
                            <CommandDisplay command={commands[activeManager]} />
                            
                            <button
                                onClick={handleCopyAndInstall}
                                disabled={isInstalling}
                                className="ml-4 p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none"
                                title="Copy and Run"
                            >
                                {isCopied && !isInstalling ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Installation Logs */}
                        <div className="space-y-2">
                            {isInstalling && (
                                <>
                                    {installLog.map((line, index) => (
                                        <div key={index} className="flex items-center animate-fade-in-subtle">
                                            {line.status === 'pending' ? (
                                                <LoadingSpinner />
                                            ) : (
                                                <span className={`mr-2 ${line.text.includes('Successful') ? 'text-green-500 text-lg' : 'text-green-500'}`}>
                                                    {line.text.includes('Successful') ? '🚀' : '✓'}
                                                </span>
                                            )}
                                            <span className={`${
                                                line.text.includes('Successful') 
                                                    ? 'text-green-400 font-bold text-lg' 
                                                    : line.status === 'pending' ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                                {line.text}
                                            </span>
                                        </div>
                                    ))}
                                    {progress > 0 && <ProgressBar progress={progress} />}
                                </>
                            )}
                            
                            {/* Blinking Cursor when idle */}
                            {!isInstalling && (
                                <div className="mt-2 animate-pulse text-gray-500">_</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CLISection;
