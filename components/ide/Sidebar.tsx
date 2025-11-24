import React from 'react';
import FileExplorer from './FileExplorer';
import { examplePrompts, aiResponses } from './aiResponses';
import type { FileSystem } from './types';

interface SidebarProps {
  files: FileSystem | null;
  isLoading: boolean;
  onFileSelect: (path: string) => void;
  onGenerate: (id: keyof typeof aiResponses) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ files, isLoading, onFileSelect, onGenerate }) => {
  return (
    <div className="w-64 bg-[#252526] flex-shrink-0 flex flex-col border-r border-black/50">
      <div className="p-2 border-b border-black/50">
        <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400">Prompts</h2>
      </div>
      <div className="p-2 space-y-1.5">
          {examplePrompts.map(p => (
              <button
                  key={p.id}
                  onClick={() => onGenerate(p.id)}
                  disabled={isLoading}
                  className="w-full text-left p-2 bg-gray-700/30 hover:bg-gray-700/60 rounded-md transition text-xs text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p.text}
              </button>
          ))}
      </div>
      <div className="p-2 border-b border-t border-black/50">
        <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400">Explorer</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        <FileExplorer files={files} onFileSelect={onFileSelect} />
      </div>
    </div>
  );
};

export default Sidebar;
