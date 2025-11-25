import React, { useState, useEffect, useCallback, useRef } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const demoCommands = [
  {
    id: 'agent',
    command: 'platypus agent --prompt "Refactor user-service-v1 to use UserAPI V2"',
    buttonText: 'Run Refactoring Agent',
    code: (
      <>
        <span className="text-purple-400">import</span> {'{ platypus }'} <span className="text-purple-400">from</span> <span className="text-green-400">'@platypus-ai/sdk'</span>;
        <br /><br />
        <span className="text-gray-500"># Command Platypus to refactor a legacy API</span>
        <br />
        <span className="text-blue-400">await</span> platypus.<span className="text-cyan-400">agent</span>.<span className="text-yellow-400">run</span>({'{'}
        <br />
        {'  '}<span className="text-cyan-400">prompt</span>: <span className="text-green-400">"Refactor user-service-v1 to use UserAPI V2"</span>,
        <br />
        {'  '}<span className="text-cyan-400">scope</span>: [<span className="text-green-400">'src/services/'</span>],
        <br />
        {'  '}<span className="text-cyan-400">onDiff</span>: (diff) => <span className="text-yellow-400">reviewAndApply</span>(diff),
        <br />
        {'}'});
        <br />
        <span className="text-green-400">'Agent started. View progress in the Platypus panel.'</span>
      </>
    ),
    terminalOutput: [
      'Agent "refactor-api" initialized.',
      'Analyzing project context...',
      'Found 5 relevant files in `src/services/`.',
      'Generating multi-file diff...',
      '✓ Code generation complete. Applying diff.'
    ]
  },
  {
    id: 'python',
    command: 'platypus generate:tests --file src/checkout.py --coverage 95',
    buttonText: 'Generate Python Tests',
    code: (
      <>
        <span className="text-purple-400">from</span> platypus <span className="text-purple-400">import</span> PlatypusClient
        <br /><br />
        client = <span className="text-yellow-400">PlatypusClient</span>()
        <br /><br />
        <span className="text-gray-500"># Generate unit tests for a complex function</span>
        <br />
        client.<span className="text-yellow-400">generate_tests</span>(
        <br />
        {'  '}file=<span className="text-green-400">'src/checkout.py'</span>,
        <br />
        {'  '}function=<span className="text-green-400">'process_payment'</span>,
        <br />
        {'  '}coverage_target=<span className="text-red-400">95</span>
        <br />
        )
        <br />
        <span className="text-yellow-400">print</span>(<span className="text-green-400">"✓ Tests generated in 'tests/test_checkout.py'"</span>)
      </>
    ),
    terminalOutput: [
      'Test generation initiated for `process_payment`.',
      'Analyzing function complexity and dependencies...',
      'Generating 5 test cases to achieve 95% coverage.',
      '✓ Tests generated in `tests/test_checkout.py`.'
    ]
  },
  {
    id: 'cli',
    command: 'platypus scan --fix --severity high',
    buttonText: 'Fix Security Issues',
    code: (
      <>
        <span className="text-gray-500"># Use the Platypus CLI to find and fix security issues</span>
        <br />
        <span className="text-cyan-400">$</span> platypus scan --fix --severity high
        <br /><br />
        <span className="text-white">Scanning 1,348 files...</span>
        <br />
        <span className="text-yellow-400">[+] Found 3 high-severity vulnerabilities.</span>
        <br />
        <span className="text-white">Applying patches...</span>
        <br />
        <span className="text-green-400">✓ Patches applied. Your project is now more secure.</span>
      </>
    ),
     terminalOutput: [
      'Scanning project for vulnerabilities...',
      '[+] Found 3 high-severity vulnerabilities.',
      'Applying automated security patches...',
      '✓ Patches applied successfully.',
      'Your project is now more secure.'
    ]
  },
];

// FIX: Replaced the original `getCodeAsString` with a more robust and type-safe version
// that correctly traverses React nodes to extract the string content. This resolves
// multiple 'Property 'children' does not exist on type 'unknown'' errors.
const getCodeAsString = (node: React.ReactNode): string => {
    if (node === null || typeof node === 'boolean' || typeof node === 'undefined') {
        return '';
    }
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(child => getCodeAsString(child)).join('');
    }
    if (React.isValidElement(node)) {
        // FIX: The 'children' property is not guaranteed to exist on the props of a generic ReactElement.
        // Casting `node.props` allows us to safely access `children` and fixes the TypeScript error.
        return getCodeAsString((node.props as { children?: React.ReactNode }).children);
    }
    return '';
};


const DemoSection: React.FC = (): React.ReactElement => {
  const [activeCommandId, setActiveCommandId] = useState<string>(demoCommands[0].id);
  const [displayedCommand, setDisplayedCommand] = useState<string>('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [displayedCode, setDisplayedCode] = useState<React.ReactNode>(<></>);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // FIX: Changed NodeJS.Timeout to number, as setTimeout in a browser environment returns a number.
  const animationTimeoutRef = useRef<number[]>([]);

  const cleanupAnimation = useCallback(() => {
    animationTimeoutRef.current.forEach(clearTimeout);
    animationTimeoutRef.current = [];
  }, []);
  
  const typewriter = useCallback((text: string, updater: (char: string) => void, delay: number = 30) => {
    return new Promise<void>(resolve => {
        let i = 0;
        const type = () => {
            if (i < text.length) {
                updater(text[i]);
                i++;
                const timeoutId = setTimeout(type, delay);
                animationTimeoutRef.current.push(timeoutId);
            } else {
                resolve();
            }
        };
        type();
    });
  }, []);

  const runCommand = useCallback(async (commandId: string) => {
    if (isAnimating) return;
    
    cleanupAnimation();
    setIsAnimating(true);
    setActiveCommandId(commandId);
    setDisplayedCommand('');
    setTerminalLines([]);
    setDisplayedCode(<></>);

    const commandConfig = demoCommands.find(c => c.id === commandId);
    if (!commandConfig) {
      setIsAnimating(false);
      return;
    };

    await typewriter(commandConfig.command, (char) => setDisplayedCommand(prev => prev + char));
    
    await new Promise<void>(res => {
      const timeoutId = setTimeout(res, 300);
      animationTimeoutRef.current.push(timeoutId);
    });
    
    for (const line of commandConfig.terminalOutput) {
        setTerminalLines(prev => [...prev, line]);
        await new Promise<void>(res => {
          const timeoutId = setTimeout(res, 150 + Math.random() * 100);
          animationTimeoutRef.current.push(timeoutId);
        });
    }

    const fullCodeString = getCodeAsString(<div>{commandConfig.code}</div>);
    await typewriter(fullCodeString, () => {}, 10);
    setDisplayedCode(commandConfig.code);

    setIsAnimating(false);
  }, [isAnimating, cleanupAnimation, typewriter]);

  useEffect(() => {
    runCommand(demoCommands[0].id);
    return cleanupAnimation;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="demo" className="py-16 md:py-20 bg-platypus-secondary dark:bg-platypus-dark-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text">See Platypus <span className="text-platypus-accent">in Action</span></h2>
          <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-3xl mx-auto">From autonomous agents to CLI tools, Platypus adapts to your workflow, providing intelligent assistance where you need it most.</p>
        </div>

        <div className="flex justify-center mb-8">
            <AnimatedPlatypus 
              mascotType="magnifying"
              className="w-40 h-40 md:w-52 md:h-52"
            />
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
                {demoCommands.map(cmd => (
                    <button
                        key={cmd.id}
                        onClick={() => runCommand(cmd.id)}
                        disabled={isAnimating}
                        className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all duration-300 ${activeCommandId === cmd.id ? 'bg-platypus-primary text-white border-platypus-primary' : 'bg-white dark:bg-platypus-dark-secondary text-platypus-text dark:text-platypus-dark-text border-gray-300 dark:border-gray-600 hover:border-platypus-primary disabled:opacity-50'}`}
                    >
                        {cmd.buttonText}
                    </button>
                ))}
            </div>
            <div className="bg-[#282c34] rounded-xl shadow-2xl overflow-hidden">
                <div className="h-8 bg-gray-700 flex items-center px-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                </div>
                <div className="p-6 text-sm md:text-base text-left font-mono min-h-[300px] flex flex-col">
                    <div className="flex-shrink-0">
                        <div className="flex items-center">
                            <span className="text-cyan-400 mr-2">$</span>
                            <span className="text-white flex-grow">{displayedCommand}</span>
                            {!isAnimating && <span className="w-2 h-4 bg-orange-400 animate-code-blink"/>}
                        </div>
                        {terminalLines.map((line, index) => (
                            <div key={index} className={`whitespace-pre-wrap ${line.startsWith('✓') ? 'text-green-400' : 'text-gray-400'}`}>{line}</div>
                        ))}
                    </div>
                    {terminalLines.length > 0 && (
                      <pre className="mt-4 flex-grow overflow-x-auto">
                          <code className="text-white whitespace-pre-wrap">
                              {displayedCode}
                          </code>
                      </pre>
                    )}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;