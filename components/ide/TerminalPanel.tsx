import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { TerminalIcon } from './Icons';
import type { FileSystem } from './types';
import { aiResponses } from './aiResponses';
import { getRawFileContent, getFolderContent, removeFileSystemEntry } from './utils';

interface TerminalPanelProps {
  initialCommand?: string;
  currentFileSystem: FileSystem | null;
  onGenerationComplete: () => void;
  onFilesChange: (newFiles: FileSystem) => void;
}

interface TerminalHandle {
  processCommand: (command: string) => void;
}

const TerminalPanel = forwardRef<TerminalHandle, TerminalPanelProps>(({ initialCommand, onGenerationComplete, onFilesChange, currentFileSystem }, ref) => {
    const [history, setHistory] = useState<string[]>(['Welcome to the Platypus IDE simulation. Type `help` for commands.']);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, isProcessing]);
    
    useEffect(() => {
        if (!isProcessing) {
            inputRef.current?.focus();
        }
    }, [isProcessing]);

    const executeCommand = useCallback(async (commandStr: string): Promise<string[]> => {
        const [command, ...args] = commandStr.trim().split(' ').filter(Boolean);

        switch (command) {
            case 'help':
                return [
                    'Available commands:',
                    '  help              - Show this help message.',
                    '  ls [path]         - List files in a directory.',
                    '  cat <file_path>   - Display file content.',
                    '  rm <path>         - Remove a file or empty directory.',
                    '  platypus create ... - Run a generation task (see sidebar).',
                    '  clear / cls       - Clear the terminal screen.',
                ];
            case 'cls':
            case 'clear':
                setHistory([]);
                return [];
            case 'ls': {
                if (!currentFileSystem) return ['Error: No file system loaded.'];
                const content = getFolderContent(currentFileSystem, args[0] || '/');
                if (content) {
                    return Object.entries(content).map(([name, entry]) => 
                        entry.type === 'folder' ? `drw-r--r--  ${name}/` : `-rw-r--r--  ${name}`
                    );
                }
                return [`ls: cannot access '${args[0] || '/'}': No such file or directory`];
            }
            case 'cat': {
                if (!args[0]) return ['Usage: cat <file_path>'];
                if (!currentFileSystem) return ['Error: No file system loaded.'];
                const fileContent = getRawFileContent(currentFileSystem, args[0]);
                return fileContent !== null ? [fileContent] : [`cat: ${args[0]}: No such file or directory`];
            }
            case 'rm': {
              if (!args[0]) return ['usage: rm FILE...'];
              if (!currentFileSystem) return ['Error: No file system loaded.'];
              const { fs: newFs, error } = removeFileSystemEntry(currentFileSystem, args[0]);
              if (error) return [error];
              onFilesChange(newFs);
              return [];
            }
            case 'platypus': {
                const task = args[1] as keyof typeof aiResponses;
                const response = aiResponses[task];
                if (args[0] === 'create' && response) {
                    for (const line of response.terminal) {
                        setHistory(prev => [...prev, line]);
                        await new Promise(res => setTimeout(res, 150 + Math.random() * 100));
                    }
                    onGenerationComplete();
                    return [];
                }
                return [`platypus: unknown command '${commandStr}'. See sidebar for examples.`];
            }
            default:
                if (command) return [`command not found: ${command}`];
                return [];
        }
    }, [currentFileSystem, onFilesChange, onGenerationComplete]);

    const processCommand = useCallback(async (commandToProcess: string) => {
      const trimmedCommand = commandToProcess.trim();
      setHistory(prev => [...prev, `$ ${trimmedCommand}`]);
      if (trimmedCommand) {
        setCommandHistory(prev => [trimmedCommand, ...prev]);
      }
      setHistoryIndex(-1);
      setInput('');
      setIsProcessing(true);
      
      const output = await executeCommand(trimmedCommand);
      if (output.length > 0) {
        setHistory(prev => [...prev, ...output]);
      }

      setIsProcessing(false);
    }, [executeCommand]);

    useImperativeHandle(ref, () => ({
      processCommand,
    }));

    useEffect(() => {
      if (initialCommand) {
        processCommand(initialCommand);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCommand]); // Only run when initialCommand changes

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isProcessing) {
            e.preventDefault();
            processCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            if(newIndex >= 0) {
              setHistoryIndex(newIndex);
              setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = Math.max(historyIndex - 1, -1);
            setHistoryIndex(newIndex);
            setInput(newIndex >= 0 ? commandHistory[newIndex] : '');
        }
    };

  return (
    <div className="flex-grow bg-[#1e1e1e] border-t border-black/50 flex flex-col" onClick={() => inputRef.current?.focus()} role="document">
      <div className="flex-shrink-0 p-2 border-b border-black/50 flex items-center gap-2">
        <TerminalIcon />
        <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400">Terminal</h3>
      </div>
      <div className="flex-grow p-2 overflow-y-auto text-xs" aria-live="polite">
        {history.map((line, index) => (
          <div key={index} className="flex whitespace-pre-wrap font-mono">
            {line.startsWith('$ ') ? (
              <><span className="text-gray-500 mr-2 select-none">$</span><span>{line.substring(2)}</span></>
            ) : (
              <span className={line.startsWith('✓') ? 'text-green-400' : ''}>{line}</span>
            )}
          </div>
        ))}
        {!isProcessing && (
            <div className="flex">
                <label htmlFor="terminal-input" className="text-gray-500 mr-2 select-none">$</label>
                <input
                    id="terminal-input"
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isProcessing}
                    aria-label="Terminal input"
                />
            </div>
        )}
        <div ref={endOfTerminalRef} />
      </div>
    </div>
  );
});

TerminalPanel.displayName = 'TerminalPanel';
export default TerminalPanel;
