import React, { useState, useCallback, useRef } from 'react';
import { PlatypusLogoSVG } from '../components/PlatypusPlaceholders';
import ActivityBar from '../components/ide/ActivityBar';
import Sidebar from '../components/ide/Sidebar';
import TerminalPanel from '../components/ide/TerminalPanel';
import { aiResponses, examplePrompts } from '../components/ide/aiResponses';
import { removeFileSystemEntry } from '../components/ide/utils';
import type { FileSystem } from '../components/ide/types';
import { BackIcon } from '../components/ide/Icons';

interface TerminalHandle {
  processCommand: (command: string) => void;
}

interface PlaygroundPageProps {
  onNavigateHome: () => void;
}

const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ onNavigateHome }): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileSystem, setFileSystem] = useState<FileSystem | null>(null);
  const [terminalKey, setTerminalKey] = useState(0);
  const [initialCommand, setInitialCommand] = useState('');
  const [activeResponseId, setActiveResponseId] = useState<keyof typeof aiResponses | null>(null);
  const terminalRef = useRef<TerminalHandle>(null);

  const handleGenerate = useCallback((id: keyof typeof aiResponses) => {
    if (isLoading) return;

    setIsLoading(true);
    setFileSystem(null);
    setActiveResponseId(id);
    setInitialCommand(`platypus create ${id}`);
    setTerminalKey(k => k + 1); // Remount terminal with new initial command
  }, [isLoading]);
  
  const handleGenerationComplete = useCallback(() => {
    if (activeResponseId) {
      const response = aiResponses[activeResponseId];
      setFileSystem(response.files);
    }
    setIsLoading(false);
  }, [activeResponseId]);

  const handleFileSelect = useCallback((path: string) => {
    terminalRef.current?.processCommand(`cat ${path}`);
  }, []);

  const handleFileDelete = useCallback((path: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete ${path}?`)) {
      setFileSystem(fs => {
        if (!fs) return null;
        const { fs: newFs } = removeFileSystemEntry(fs, path);
        return newFs;
      });
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] text-gray-300 flex flex-col font-mono text-sm overflow-hidden">
      <header className="flex-shrink-0 bg-[#333333] border-b border-black/50 flex justify-between items-center px-4 py-1.5 z-10">
        <div className="flex items-center space-x-4">
            <PlatypusLogoSVG className="w-7 h-7" />
            <span className="text-lg font-bold text-white">Platypus IDE</span>
        </div>
        <button 
          onClick={onNavigateHome} 
          className="flex items-center gap-2 px-4 py-1.5 bg-gray-600/50 hover:bg-gray-600/80 text-white font-bold rounded-md shadow-sm transition-transform duration-200 hover:scale-105"
          aria-label="Exit playground"
        >
            <BackIcon />
            Exit Playground
        </button>
      </header>

      <main className="flex-grow flex overflow-hidden">
        <ActivityBar />
        <Sidebar 
            files={fileSystem}
            isLoading={isLoading}
            onFileSelect={handleFileSelect}
            onFileDelete={handleFileDelete}
            onGenerate={handleGenerate}
            prompts={examplePrompts}
        />
        <div className="flex-grow flex flex-col overflow-hidden min-w-0">
            <TerminalPanel
              ref={terminalRef}
              key={terminalKey}
              initialCommand={initialCommand}
              onGenerationComplete={handleGenerationComplete}
              onFilesChange={setFileSystem}
              currentFileSystem={fileSystem}
            />
        </div>
      </main>
    </div>
  );
};

export default PlaygroundPage;
