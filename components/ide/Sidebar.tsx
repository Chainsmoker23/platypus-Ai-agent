import React from 'react';
import FileExplorer from './FileExplorer';
import type { FileSystem, AiResponses, ExamplePrompt } from './types';

interface SidebarProps {
  files: FileSystem | null;
  isLoading: boolean;
  prompts: ExamplePrompt[];
  onFileSelect: (path: string) => void;
  onFileDelete: (path: string) => void;
  onGenerate: (id: keyof AiResponses) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <aside className="w-80 bg-[#252526] flex-shrink-0 flex flex-col border-r border-black/50 min-w-[250px] max-w-[400px]">
      <>
        <div className="p-2 border-b border-black/50 flex-shrink-0">
          <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400">Prompts</h2>
        </div>
        <div className="p-2 space-y-1.5 flex-shrink-0">
            {props.prompts.map(p => (
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
        <div className="p-2 border-b border-t border-black/50 flex-shrink-0">
          <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400">Explorer</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <FileExplorer 
            files={props.files} 
            onFileSelect={props.onFileSelect}
            onFileDelete={props.onFileDelete}
          />
        </div>
      </>
    </aside>
  );
};

export default React.memo(Sidebar);
