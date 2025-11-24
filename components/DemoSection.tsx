import React, { useState, useEffect } from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const codeSnippets = [
  {
    id: 'agent',
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
  },
  {
    id: 'python',
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
  },
  {
    id: 'cli',
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
  },
];


const DemoSection: React.FC = () => {
  console.log('Rendering: DemoSection');
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (codeSnippets.length <= 1) return;

    const intervalId = setInterval(() => {
      setIsFading(true);
      
      const timeoutId = setTimeout(() => {
        setSnippetIndex(prevIndex => (prevIndex + 1) % codeSnippets.length);
        setIsFading(false);
      }, 500); // This should match the fade-out duration

      return () => clearTimeout(timeoutId);
    }, 6000); // Switch every 6 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="demo" className="py-16 md:py-20 bg-platypus-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text">See Platypus <span className="text-platypus-accent">in Action</span></h2>
          <p className="text-lg text-platypus-subtle mt-4 max-w-3xl mx-auto">From autonomous agents to CLI tools, Platypus adapts to your workflow, providing intelligent assistance where you need it most.</p>
        </div>

        <div className="flex justify-center mb-8">
            <AnimatedPlatypus 
              mascotType="magnifying"
              className="w-40 h-40 md:w-52 md:h-52"
            />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-[#282c34] rounded-xl shadow-2xl overflow-hidden">
            <div className="h-8 bg-gray-700 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <pre className="p-6 text-sm md:text-base text-left overflow-x-auto min-h-[250px]">
              <code className={`text-white font-mono whitespace-pre-wrap transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                {codeSnippets[snippetIndex].code}
              </code>
            </pre>
          </div>
           <div className="absolute bottom-4 right-4 flex space-x-2">
              {codeSnippets.map((_, index) => (
                <div
                  key={index}
                  aria-label={`Code snippet ${index + 1} of ${codeSnippets.length}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === snippetIndex ? 'bg-platypus-primary scale-125' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;