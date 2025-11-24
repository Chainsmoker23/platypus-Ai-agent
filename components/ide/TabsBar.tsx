import React from 'react';
import { FileIcon, CloseIcon } from './Icons';

interface TabsBarProps {
  tabs: string[];
  activeTab: string | null;
  onTabSelect: (path: string) => void;
  onTabClose: (path: string) => void;
}

const TabsBar: React.FC<TabsBarProps> = ({ tabs, activeTab, onTabSelect, onTabClose }) => {
  const getFileName = (path: string) => path.split('/').pop();
  
  return (
    <div className="flex-shrink-0 bg-[#252526] flex items-end">
        <div className="flex-grow h-full overflow-x-auto whitespace-nowrap">
        {tabs.map(tab => (
            <div
            key={tab}
            className={`inline-flex items-center h-full border-r border-black/50 cursor-pointer text-xs ${
                activeTab === tab ? 'bg-[#1e1e1e] text-white' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#333333]'
            }`}
            >
            <div
              className="flex items-center gap-2 pl-3 pr-2 py-2"
              onClick={() => onTabSelect(tab)}
            >
              <FileIcon />
              <span>{getFileName(tab)}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab);
              }}
              className="px-1.5 py-2 hover:bg-white/10 rounded"
              aria-label={`Close ${getFileName(tab)}`}
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TabsBar;
