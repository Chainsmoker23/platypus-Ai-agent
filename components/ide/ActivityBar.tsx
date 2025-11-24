import React from 'react';
import { FilesIcon } from './Icons';

interface ActivityBarProps {
  onToggleSidebar: () => void;
  isSidebarActive: boolean;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ onToggleSidebar, isSidebarActive }) => {
  return (
    <div className="w-12 bg-[#333333] flex-shrink-0 flex flex-col items-center pt-4 border-r border-black/50">
      <button
        onClick={onToggleSidebar}
        className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-200 ${
          isSidebarActive ? 'bg-gray-600/50 text-white' : 'text-gray-400 hover:bg-gray-700/50'
        }`}
        aria-label={isSidebarActive ? 'Close sidebar' : 'Open sidebar'}
        title="Explorer"
      >
        <FilesIcon />
      </button>
    </div>
  );
};

export default ActivityBar;
