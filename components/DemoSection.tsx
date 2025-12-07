
import React, { useState, useEffect, useCallback } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';
import { useTypewriter } from '../hooks/useTypewriter';

const demoCommands = [
  {
    id: 'agent',
    command: 'platypus agent --prompt "Refactor user-service-v1 to use UserAPI V2"',
    buttonText: 'Run Refactoring Agent',
    code: (
      <>
        <span className="text-purple-400">import</span> {'{ platypus }'} <span className="text-purple-400">from</span> <span className="text-green-400">'@platypus-ai/sdk'</span>;
        <br /><br />
        <span className="text-gray-400"># Command Platypus to refactor a legacy API</span>
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
        <span className="text-gray-400"># Generate unit tests for a complex function</span>
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
        <span className="text-gray-400"># Use the Platypus CLI to find and fix security issues</span>
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
        const props = node.props as { children?: React.ReactNode };
        if (props.children) {
            return getCodeAsString(props.children);
        }
    }
    return '';
};


const DemoSection: React.FC = (): React.ReactElement => {
  const [activeCommandId, setActiveCommandId] = useState<string>(demoCommands[0].id);
  const [displayedCommand, setDisplayedCommand] = useState<string>('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [displayedCode, setDisplayedCode] = useState<React.ReactNode>(<></>);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Use the custom hook
  const { typeText, wait, cleanup } = useTypewriter();

  const runCommand = useCallback(async (commandId: string) => {
    if (isAnimating) return;
    
    // Clean up any existing animations
    cleanup();
    
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

    // Type the command
    await typeText(commandConfig.command, (char) => setDisplayedCommand(prev => prev + char));
    
    // Pause briefly
    await wait(300);
    
    // Show terminal output line by line with varying delays
    for (const line of commandConfig.terminalOutput) {
        setTerminalLines(prev => [...prev, line]);
        await wait(150 + Math.random() * 100);
    }

    // Type the code block
    const fullCodeString = getCodeAsString(<div>{commandConfig.code}</div>);
    await typeText(fullCodeString, () => {}, 10); // Typing effect for code (visual only, we set full component after)
    setDisplayedCode(commandConfig.code);

    setIsAnimating(false);
  }, [isAnimating, cleanup, typeText, wait]);

  useEffect(() => {
    runCommand(demoCommands[0].id);
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="demo" className="py-16 md:py-20 dark:bg-platypus-dark-background transition-colors duration-300">
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
                        className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all duration-300 ${activeCommandId === cmd.id ? 'bg-platypus-primary text-white border-platypus-primary' : 'bg-white dark:bg-[#1F1F1F] text-platypus-text dark:text-platypus-dark-text border-gray-300 dark:border-gray-700 hover:border-platypus-primary disabled:opacity-50'}`}
                    >
                        {cmd.buttonText}
                    </button>
                ))}
            </div>
            
            {/* Main Terminal Window - Deep Black Aesthetic */}
            <div className="bg-[#0c0c0c] rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
                {/* Header Chrome */}
                <div className="h-10 bg-[#1F1F1F] flex items-center px-4 border-b border-gray-800">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-[#FF5F56] rounded-full"></div>
                        <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                        <div className="w-3 h-3 bg-[#27C93F] rounded-full"></div>
                    </div>
                    <div className="flex-grow text-center text-xs text-gray-500 font-mono">
                        platypus-demo — zsh
                    </div>
                </div>
                
                {/* Terminal Content */}
                <div className="p-6 text-sm md:text-base text-left font-mono min-h-[300px] flex flex-col bg-[#0c0c0c] custom-scrollbar">
                    <div className="flex-shrink-0">
                        <div className="flex items-center">
                            <span className="text-blue-400 font-bold mr-2 select-none">$</span>
                            <span className="text-white flex-grow">{displayedCommand}</span>
                            {!isAnimating && <span className="w-2 h-4 bg-gray-500 animate-pulse ml-1"/>}
                        </div>
                        {terminalLines.map((line, index) => (
                            <div key={index} className={`whitespace-pre-wrap ${line.startsWith('✓') ? 'text-green-400' : 'text-gray-400'}`}>{line}</div>
                        ))}
                    </div>
                    {terminalLines.length > 0 && (
                      <pre className="mt-4 flex-grow overflow-x-auto custom-scrollbar">
                          <code className="text-gray-200 whitespace-pre-wrap">
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
