import React, { useState, useEffect } from 'react';
import AnimatedPlatypus from '../AnimatedPlatypus';
import { CopyIcon, CheckIcon } from './Icons';

interface CodeWindowProps {
  content: React.ReactNode | null;
  rawContent: string;
  isLoading: boolean;
}

const CodeWindow: React.FC<CodeWindowProps> = ({ content, rawContent, isLoading }) => {
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleCopyCode = () => {
    if (!rawContent || copySuccess) return;
    navigator.clipboard.writeText(rawContent).then(() => {
      setCopySuccess('Copied!');
    }, () => {
      setCopySuccess('Failed!');
    });
  };

  return (
    <div className="flex-grow bg-[#1e1e1e] p-4 text-sm md:text-base overflow-auto relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]/90 z-10 animate-fade-in-subtle">
          <div className="flex items-center space-x-3">
            <AnimatedPlatypus mascotType="chat" className="w-12 h-12" />
            <span className="text-white text-lg">Platypus is generating files...</span>
          </div>
        </div>
      )}
      {!isLoading && !content && (
        <div className="text-gray-500 h-full flex items-center justify-center">
          <div className="text-center">
            <p>Select a file to view its content.</p>
            <p className="mt-2 text-xs">Or, choose a new prompt from the sidebar.</p>
          </div>
        </div>
      )}
      {content && (
        <>
        <button onClick={handleCopyCode} className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white bg-[#333333] px-3 py-1.5 rounded-md flex items-center gap-2 text-xs transition-colors">
          {copySuccess ? (
            <>
              <CheckIcon /> {copySuccess}
            </>
          ) : (
            <>
              <CopyIcon /> Copy
            </>
          )}
        </button>
        <pre className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <code className="text-white whitespace-pre-wrap">
            {content}
          </code>
        </pre>
        </>
      )}
    </div>
  );
};

export default CodeWindow;
