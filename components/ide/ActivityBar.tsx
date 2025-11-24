import React from 'react';
import { FilesIcon, ChatIcon } from './Icons';

interface ActivityBarProps {
  activeView: 'explorer' | 'chat';
  onSelectView: (view: 'explorer' | 'chat') => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, onSelectView }) => {
  return (
    <div className="w-12 bg-[#333333] flex-shrink-0 flex flex-col items-center pt-4 space-y-2 border-r border-black/50">
      <button
        onClick={() => onSelectView('explorer')}
        className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-200 ${
          activeView === 'explorer' ? 'bg-gray-600/50 text-white' : 'text-gray-400 hover:bg-gray-700/50'
        }`}
        aria-label="Open explorer"
        title="Explorer"
      >
        <FilesIcon />
      </button>
      <button
        onClick={() => onSelectView('chat')}
        className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-200 ${
          activeView === 'chat' ? 'bg-gray-600/50 text-white' : 'text-gray-400 hover:bg-gray-700/50'
        }`}
        aria-label="Open chat"
        title="Chat"
      >
        <ChatIcon />
      </button>
    </div>
  );
};

export default ActivityBar;