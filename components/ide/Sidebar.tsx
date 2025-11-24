import React from 'react';
import FileExplorer from './FileExplorer';
import ChatPanel from './ChatPanel';
import { examplePrompts, aiResponses } from './aiResponses';
import type { FileSystem } from './types';

interface SidebarProps {
  activeView: 'explorer' | 'chat';
  files: FileSystem | null;
  isLoading: boolean;
  onFileSelect: (path: string) => void;
  onGenerate: (id: keyof typeof aiResponses) => void;
  activeTab: string | null;
  activeFileContent: string | null;
  onApplyCodeChange: (filePath: string, newRawContent: string, newJsxContent: React.ReactNode) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className="w-80 bg-[#252526] flex-shrink-0 flex flex-col border-r border-black/50">
      {props.activeView === 'explorer' && (
        <>
          <div className="p-2 border-b border-black/50">
            <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400">Prompts</h2>
          </div>
          <div className="p-2 space-y-1.5">
              {examplePrompts.map(p => (
                  <button
                      key={p.id}
                      onClick={() => props.onGenerate(p.id)}
                      disabled={props.isLoading}
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
            <FileExplorer files={props.files} onFileSelect={props.onFileSelect} />
          </div>
        </>
      )}
      {props.activeView === 'chat' && (
          <ChatPanel 
            activeTab={props.activeTab}
            activeFileContent={props.activeFileContent}
            onApplyCodeChange={props.onApplyCodeChange}
          />
      )}
    </div>
  );
};

export default Sidebar;