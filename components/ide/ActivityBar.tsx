import React from 'react';
import { FilesIcon } from './Icons';

const ActivityBar: React.FC = () => {
  const views: { id: 'explorer'; label: string; icon: React.ReactNode }[] = [
    { id: 'explorer', label: 'Explorer', icon: <FilesIcon /> },
  ];

  return (
    <nav className="w-12 bg-[#333333] flex-shrink-0 flex flex-col items-center pt-4 space-y-2 border-r border-black/50" aria-label="IDE Activity Bar">
      {views.map(view => (
        <button
          key={view.id}
          className="w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-200 bg-gray-600/50 text-white"
          aria-label={view.label}
          title={view.label}
          aria-pressed={true}
        >
          {view.icon}
        </button>
      ))}
    </nav>
  );
};

export default React.memo(ActivityBar);
