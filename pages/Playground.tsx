import React, { useState } from 'react';
import AnimatedPlatypus from '../components/AnimatedPlatypus';
import { PlatypusLogoSVG } from '../components/PlatypusPlaceholders';

const aiResponses = {
  'python-data': (
    <>
      <span className="text-purple-400">import</span> requests
      <br />
      <span className="text-purple-400">import</span> json
      <br /><br />
      <span className="text-purple-400">def</span> <span className="text-yellow-400">fetch_user_data</span>(api_url: str):
      <br />
      {'  '}<span className="text-gray-500">"""Fetches user data from a given API endpoint."""</span>
      <br />
      {'  '}<span className="text-purple-400">try</span>:
      <br />
      {'    '}response = requests.<span className="text-yellow-400">get</span>(api_url)
      <br />
      {'    '}response.<span className="text-yellow-400">raise_for_status</span>()  <span className="text-gray-500"># Raises an exception for 4XX/5XX errors</span>
      <br />
      {'    '}<span className="text-purple-400">return</span> response.<span className="text-yellow-400">json</span>()
      <br />
      {'  '}<span className="text-purple-400">except</span> requests.exceptions.RequestException <span className="text-purple-400">as</span> e:
      <br />
      {'    '}<span className="text-yellow-400">print</span>(<span className="text-green-400">{`f"An error occurred: {e}"`}</span>)
      <br />
      {'    '}<span className="text-purple-400">return</span> None
    </>
  ),
  'react-button': (
    <>
      <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;
      <br /><br />
      <span className="text-purple-400">const</span> <span className="text-yellow-400">StyledButton</span> = ({'{'} onClick, children {'}'}) => {'{'}
      <br />
      {'  '}<span className="text-purple-400">return</span> (
      <br />
      {'    '}&lt;<span className="text-red-400">button</span>
      <br />
      {'      '}<span className="text-cyan-400">onClick</span>={'{'}onClick{'}'}
      <br />
      {'      '}<span className="text-cyan-400">className</span>=<span className="text-green-400">"px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"</span>
      <br />
      {'    '}&gt;
      <br />
      {'      '}{'{'}children{'}'}
      <br />
      {'    '}&lt;/<span className="text-red-400">button</span>&gt;
      <br />
      {'  '});
      <br />
      {'}'};
      <br /><br />
      <span className="text-purple-400">export default</span> StyledButton;
    </>
  ),
  'express-server': (
     <>
      <span className="text-purple-400">const</span> express = <span className="text-yellow-400">require</span>(<span className="text-green-400">'express'</span>);
      <br />
      <span className="text-purple-400">const</span> app = <span className="text-yellow-400">express</span>();
      <br />
      <span className="text-purple-400">const</span> PORT = <span className="text-red-400">3000</span>;
      <br /><br />
      app.<span className="text-yellow-400">get</span>(<span className="text-green-400">'/'</span>, (req, res) => {'{'}
      <br />
      {'  '}res.<span className="text-yellow-400">send</span>(<span className="text-green-400">'Hello from Platypus AI!'</span>);
      <br />
      {'}'});
      <br /><br />
      app.<span className="text-yellow-400">listen</span>(PORT, () => {'{'}
      <br />
      {'  '}<span className="text-yellow-400">console</span>.<span className="text-yellow-400">log</span>(<span className="text-green-400">{`\`Server is running on http://localhost:\${PORT}\``}</span>);
      <br />
      {'}'});
    </>
  ),
};

const aiResponsesRaw = {
  'python-data': `import requests
import json

def fetch_user_data(api_url: str):
    """Fetches user data from a given API endpoint."""
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None`,
  'react-button': `import React from 'react';

const StyledButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      {children}
    </button>
  );
};

export default StyledButton;`,
  'express-server': `const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Platypus AI!');
});

app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});`,
};

const examplePrompts = [
  { id: 'react-button', text: 'Create a stylish button component with React and Tailwind CSS.' },
  { id: 'python-data', text: 'Write a Python function to fetch data from an API with error handling.' },
  { id: 'express-server', text: 'Generate a simple Express.js server boilerplate.' },
];

const BackIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const CopyIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CheckIcon = () => <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLineJoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;

const CodeEditor: React.FC<{
  content: React.ReactNode;
  isLoading: boolean;
  onCopy: () => void;
  copySuccess: string;
}> = ({ content, isLoading, onCopy, copySuccess }) => {
  return (
    <div className="bg-[#282c34] rounded-xl shadow-2xl overflow-hidden h-full flex flex-col">
      <div className="h-8 bg-gray-700 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <button onClick={onCopy} className="text-gray-400 hover:text-white flex items-center gap-2 text-xs transition-colors">
          {copySuccess ? (
            <>
              <CheckIcon /> {copySuccess}
            </>
          ) : (
            <>
              <CopyIcon /> Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-6 text-sm md:text-base text-left overflow-auto flex-grow relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#282c34]/80 z-10 animate-fade-in-subtle">
            <div className="flex items-center space-x-3">
              <AnimatedPlatypus mascotType="chat" className="w-12 h-12 animate-pulse" />
              <span className="text-white font-mono text-lg">Platypus is thinking...</span>
            </div>
          </div>
        )}
        {!isLoading && !content && (
          <div className="text-gray-400 font-mono">
            {'// Your generated code will appear here.'}
            <br />
            {'// Try one of the examples or write your own prompt!'}
          </div>
        )}
        <pre className={`transition-opacity duration-500 ${isLoading || !content ? 'opacity-0' : 'opacity-100'}`}>
          <code className="text-white font-mono whitespace-pre-wrap">
            {content}
          </code>
        </pre>
      </div>
    </div>
  );
};

const PlaygroundPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCodeId, setCurrentCodeId] = useState<keyof typeof aiResponses | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleGenerate = (id?: keyof typeof aiResponses) => {
    if (isLoading) return;

    let responseKey = id;
    if (!responseKey) {
        const customPromptKey = examplePrompts.find(p => p.text === prompt)?.id as keyof typeof aiResponses;
        if (customPromptKey) {
            responseKey = customPromptKey;
        } else {
            const keys = Object.keys(aiResponses) as Array<keyof typeof aiResponses>;
            responseKey = keys[Math.floor(Math.random() * keys.length)];
        }
    }

    setIsLoading(true);
    setGeneratedCode(null);
    setCurrentCodeId(null);
    
    setTimeout(() => {
      setGeneratedCode(aiResponses[responseKey!]);
      setCurrentCodeId(responseKey);
      setIsLoading(false);
    }, 1500 + Math.random() * 500);
  };

  const handleExampleClick = (id: keyof typeof aiResponses, text: string) => {
    setPrompt(text);
    handleGenerate(id);
  };

  const handleCopyCode = () => {
    if (!currentCodeId || !aiResponsesRaw[currentCodeId] || copySuccess) return;
    navigator.clipboard.writeText(aiResponsesRaw[currentCodeId]).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className="h-screen w-screen bg-white text-platypus-text flex flex-col font-sans">
      <header className="flex-shrink-0 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PlatypusLogoSVG className="w-10 h-10" />
            <span className="text-2xl font-bold text-platypus-text">Platypus Playground</span>
          </div>
          <button onClick={onNavigateHome} className="flex items-center gap-2 px-4 py-2 bg-platypus-secondary text-platypus-text font-bold rounded-full shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300">
            <BackIcon />
            Back to Home
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Controls Panel */}
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-platypus-secondary p-6 border-r border-gray-200 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex items-center gap-4 mb-4">
                  <AnimatedPlatypus mascotType="chat" className="w-16 h-16" />
                  <h3 className="text-2xl font-bold text-platypus-text">Control Panel</h3>
              </div>
              <p className="text-platypus-subtle mb-4">Tell Platypus what to build, or try one of our examples.</p>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a React button with loading states"
                className="w-full h-32 p-3 bg-white rounded-lg border-2 border-transparent focus:border-platypus-primary focus:ring-0 transition"
                disabled={isLoading}
              />
              <button
                onClick={() => handleGenerate()}
                disabled={isLoading || !prompt}
                className="w-full mt-4 px-6 py-3 bg-platypus-accent text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:bg-platypus-subtle disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Generate Code'}
              </button>
            </div>
            <div className="mt-8">
              <h4 className="font-bold text-platypus-text">Or try an example:</h4>
              <div className="mt-3 space-y-2">
                  {examplePrompts.map(p => (
                      <button 
                          key={p.id}
                          onClick={() => handleExampleClick(p.id as keyof typeof aiResponses, p.text)}
                          disabled={isLoading}
                          className="w-full text-left p-3 bg-white/70 hover:bg-white rounded-md transition text-sm text-platypus-subtle hover:text-platypus-primary disabled:opacity-50"
                      >
                        {p.text}
                      </button>
                  ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Editor Panel */}
        <div className="flex-grow p-6 lg:p-8 bg-gray-50">
            <CodeEditor content={generatedCode} isLoading={isLoading} onCopy={handleCopyCode} copySuccess={copySuccess} />
        </div>
      </main>
    </div>
  );
};

export default PlaygroundPage;