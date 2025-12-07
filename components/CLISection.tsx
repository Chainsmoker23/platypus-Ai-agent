
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { CopyIcon, CheckIcon } from './ide/Icons';
import AnimatedPlatypus from './AnimatedPlatypus';

type PackageManager = 'npm' | 'yarn' | 'pnpm';

const commands: Record<PackageManager, string> = {
  npm: 'npm install -g platypus-cli',
  yarn: 'yarn global add platypus-cli',
  pnpm: 'pnpm add -g platypus-cli',
};

const installLogLines = [
  'Fetching packages...',
  'Resolving dependencies...',
  'Linking binaries...',
  '✓ Platypus CLI installed successfully!',
];

const CLISection: React.FC = () => {
  const [activeManager, setActiveManager] = useState<PackageManager>('npm');
  const [isInstalling, setIsInstalling] = useState(false);
  const [installLog, setInstallLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState(commands.npm);
  const [isCopied, setIsCopied] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId: number;
    const typeCommand = (command: string) => {
      let i = 0;
      setDisplayedCommand('');
      const tick = () => {
        if (i < command.length) {
          setDisplayedCommand(prev => prev + command.charAt(i));
          i++;
          timeoutId = window.setTimeout(tick, 50);
        }
      };
      tick();
    };

    typeCommand(commands[activeManager]);

    return () => clearTimeout(timeoutId);
  }, [activeManager]);

  const handleCopyAndInstall = () => {
    if (isInstalling) return;

    navigator.clipboard.writeText(commands[activeManager]);
    setIsCopied(true);
    setIsInstalling(true);
    setInstallLog([]);
    setProgress(0);

    const installSteps = [
      () => { setInstallLog(prev => [...prev, installLogLines[0]]); setProgress(30); },
      () => { setInstallLog(prev => [...prev, installLogLines[1]]); setProgress(60); },
      () => { setInstallLog(prev => [...prev, installLogLines[2]]); setProgress(90); },
      () => { setInstallLog(prev => [...prev, installLogLines[3]]); setProgress(100); },
      () => {
        setTimeout(() => {
          setIsInstalling(false);
          setIsCopied(false);
        }, 2000);
      },
    ];

    installSteps.forEach((step, index) => {
      setTimeout(step, index * 400);
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!terminalRef.current) return;
    const rect = terminalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
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
            
            <div 
                className="relative perspective-1000"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={terminalRef}
                    className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl transition-transform duration-100 preserve-3d"
                    style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
                >
                    <div className="relative bg-slate-900/70 dark:bg-black/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                        {/* Glassy Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                        <div className="h-9 bg-black/30 flex items-center px-4 justify-between">
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

                        <div className="p-6 text-sm md:text-base font-mono text-white min-h-[200px]">
                            {!isInstalling ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-cyan-400 flex-shrink-0 select-none">$</span>
                                    <span className="flex-grow overflow-x-auto whitespace-nowrap">{displayedCommand}</span>
                                    <span className="w-2 h-4 bg-orange-400 animate-code-blink" />
                                    <button
                                        onClick={handleCopyAndInstall}
                                        className="flex-shrink-0 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                                        aria-label="Copy command and run installation simulation"
                                    >
                                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-cyan-400">$</span> {commands[activeManager]}
                                    </div>
                                    {installLog.map((line, index) => (
                                        <div key={index} className={`${line.startsWith('✓') ? 'text-green-400' : 'text-gray-400'}`}>
                                            {line}
                                        </div>
                                    ))}
                                    {progress < 100 && (
                                        <div className="w-full bg-gray-600/50 rounded-full h-2.5 mt-4">
                                            <div 
                                                className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
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
      