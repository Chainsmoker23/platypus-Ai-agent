import React, { useEffect, useRef } from 'react';
import { TerminalIcon } from './Icons';

interface TerminalPanelProps {
  output: string[];
}

const TerminalPanel: React.FC<TerminalPanelProps> = ({ output }) => {
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

  return (
    <div className="h-48 flex-shrink-0 bg-[#252526] border-t border-black/50 flex flex-col">
      <div className="flex-shrink-0 p-2 border-b border-black/50 flex items-center gap-2">
        <TerminalIcon />
        <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400">Terminal</h3>
      </div>
      <div className="flex-grow p-2 overflow-y-auto text-xs">
        {output.map((line, index) => (
          <div key={index} className="flex">
            <span className="text-gray-500 mr-2 select-none">{line.startsWith('$') || line.startsWith('>') ? '' : '>'}</span>
            <span className={line.startsWith('✓') ? 'text-green-400' : ''}>{line}</span>
          </div>
        ))}
        <div ref={endOfTerminalRef} />
      </div>
    </div>
  );
};

export default TerminalPanel;
