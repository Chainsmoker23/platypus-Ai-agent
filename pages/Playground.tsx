import React, { useState, useEffect, useRef } from 'react';
import { PlatypusLogoSVG } from '../components/PlatypusPlaceholders';
import ActivityBar from '../components/ide/ActivityBar';
import Sidebar from '../components/ide/Sidebar';
import EditorPanel from '../components/ide/EditorPanel';
import TerminalPanel from '../components/ide/TerminalPanel';
import { aiResponses, examplePrompts } from '../components/ide/aiResponses';
import { getFileContent, getRawFileContent, updateFileContent } from '../components/ide/utils';
import type { FileSystem } from '../components/ide/types';

// FIX: Corrected SVG attribute 'strokeLineJoin' to 'strokeLinejoin' and 'strokeLineCap' to 'strokeLinecap'.
const BackIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

const PlaygroundPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeView, setActiveView] = useState<'explorer' | 'chat'>('explorer');

  const [files, setFiles] = useState<FileSystem | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  // State for driving the terminal
  const [terminalKey, setTerminalKey] = useState(0);
  const [initialCommand, setInitialCommand] = useState(`platypus create ${examplePrompts[0].id}`);
  const [activeResponseId, setActiveResponseId] = useState<keyof typeof aiResponses>(examplePrompts[0].id);

  const handleGenerate = (id: keyof typeof aiResponses) => {
    if (isLoading) return;

    setIsLoading(true);
    setFiles(null);
    setOpenTabs([]);
    setActiveTab(null);
    setActiveResponseId(id);
    setInitialCommand(`platypus create ${id}`);
    setTerminalKey(k => k + 1); // Reset the terminal component with a new command
  };
  
  const handleGenerationComplete = () => {
    const response = aiResponses[activeResponseId];
    if (response) {
      setFiles(response.files);
      setOpenTabs(response.openTabs);
      setActiveTab(response.initialActiveTab);
      setIsLoading(false);
    }
  };

  const handleApplyCodeChange = (filePath: string, newRawContent: string, newJsxContent: React.ReactNode) => {
    if (!files) return;
    const { fs: newFs } = updateFileContent(files, filePath, newRawContent, newJsxContent);
    setFiles(newFs);
  };

  const handleFilesChange = (newFiles: FileSystem) => {
    setFiles(newFiles);
  };

  const handleFileSelect = (path: string) => {
    if (!openTabs.includes(path)) {
      setOpenTabs(prev => [...prev, path]);
    }
    setActiveTab(path);
  };

  const handleTabClose = (path: string) => {
    const newTabs = openTabs.filter(t => t !== path);
    setOpenTabs(newTabs);

    if (activeTab === path) {
      setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };
  
  const activeFileContent = activeTab && files ? getFileContent(files, activeTab) : null;
  const rawActiveFileContent = activeTab && files ? getRawFileContent(files, activeTab) : '';

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] text-gray-300 flex flex-col font-mono text-sm">
      <header className="flex-shrink-0 bg-[#333333] border-b border-black/50 flex justify-between items-center px-4 py-1.5">
        <div className="flex items-center space-x-4">
            <PlatypusLogoSVG className="w-7 h-7" />
            <span className="text-lg font-bold text-white">Platypus IDE</span>
        </div>
        <button onClick={onNavigateHome} className="flex items-center gap-2 px-4 py-1.5 bg-gray-600/50 hover:bg-gray-600/80 text-white font-bold rounded-md shadow-sm transform hover:scale-105 transition-all duration-300">
            <BackIcon />
            Exit Playground
        </button>
      </header>

      <main className="flex-grow flex overflow-hidden">
        <ActivityBar 
          activeView={activeView}
          onSelectView={setActiveView}
        />
        <Sidebar 
            activeView={activeView}
            files={files}
            isLoading={isLoading}
            onFileSelect={handleFileSelect}
            onGenerate={handleGenerate}
            activeTab={activeTab}
            activeFileContent={rawActiveFileContent}
            onApplyCodeChange={handleApplyCodeChange}
        />
        <div className="flex-grow flex flex-col overflow-hidden">
            <EditorPanel 
                tabs={openTabs}
                activeTab={activeTab}
                onTabSelect={setActiveTab}
                onTabClose={handleTabClose}
                fileContent={activeFileContent}
                rawFileContent={rawActiveFileContent}
                isLoading={isLoading}
            />
            <TerminalPanel
              key={terminalKey}
              initialCommand={initialCommand}
              files={files}
              onGenerationComplete={handleGenerationComplete}
              onFilesChange={handleFilesChange}
            />
        </div>
      </main>
    </div>
  );
};

export default PlaygroundPage;