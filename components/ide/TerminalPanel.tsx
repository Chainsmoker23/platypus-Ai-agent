import React, { useEffect, useRef, useState } from 'react';
import { TerminalIcon } from './Icons';
import type { FileSystem } from './types';
import { aiResponses } from './aiResponses';
import { getRawFileContent, getFolderContent, addFileSystemEntry, removeFileSystemEntry } from './utils';

interface TerminalPanelProps {
  initialCommand?: string;
  files: FileSystem | null;
  onGenerationComplete: () => void;
  onFilesChange: (newFiles: FileSystem) => void;
}

const TerminalPanel: React.FC<TerminalPanelProps> = ({ initialCommand, files, onGenerationComplete, onFilesChange }) => {
    const [history, setHistory] = useState<string[]>(['Welcome to the Platypus IDE simulation. Type `help` for commands.']);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    useEffect(() => {
      if (initialCommand) {
        processCommand(initialCommand);
      } else {
        inputRef.current?.focus();
      }
    }, []);

    const executeCommand = async (commandStr: string) => {
        const [command, ...args] = commandStr.trim().split(' ').filter(Boolean);
        let output: string[] = [];

        switch (command) {
            case 'help':
                output.push('Available commands:');
                output.push('  help              - Show this help message.');
                output.push('  ls [path]         - List files in the specified directory.');
                output.push('  cat <file_path>   - Display file content.');
                output.push('  touch <file_path> - Create a new empty file.');
                output.push('  mkdir <dir_path>  - Create a new directory.');
                output.push('  rm <path>         - Remove a file or empty directory.');
                output.push('  node <file_path>  - Simulate running a node script.');
                output.push('  platypus create ... - Run a generation task (see sidebar).');
                output.push('  whoami            - Display the current user.');
                output.push('  clear / cls       - Clear the terminal screen.');
                break;
            case 'cls':
            case 'clear':
                setHistory([]);
                return;
            case 'whoami':
                output.push('platypus_user');
                break;
            case 'touch':
                if (!args[0]) { output.push('usage: touch FILE...'); break; }
                if (!files) { output.push('Error: No file system loaded.'); break; }
                const { fs: newFsTouch, error: touchError } = addFileSystemEntry(files, args[0], { type: 'file', content: <></>, rawContent: '' });
                if (touchError) {
                    output.push(`touch: ${touchError}`);
                } else {
                    onFilesChange(newFsTouch);
                }
                break;
            case 'mkdir':
                if (!args[0]) { output.push('usage: mkdir DIRECTORY...'); break; }
                if (!files) { output.push('Error: No file system loaded.'); break; }
                const { fs: newFsMkdir, error: mkdirError } = addFileSystemEntry(files, args[0], { type: 'folder', children: {} });
                 if (mkdirError) {
                    output.push(`mkdir: ${mkdirError}`);
                } else {
                    onFilesChange(newFsMkdir);
                }
                break;
            case 'rm':
                if (!args[0]) { output.push('usage: rm FILE...'); break; }
                if (!files) { output.push('Error: No file system loaded.'); break; }
                const { fs: newFsRm, error: rmError } = removeFileSystemEntry(files, args[0]);
                 if (rmError) {
                    output.push(rmError);
                } else {
                    onFilesChange(newFsRm);
                }
                break;
            case 'ls':
                const path = args[0] || '/';
                if (!files) {
                   output.push('Error: No file system loaded. Try a `platypus` command first.');
                   break;
                }
                const content = getFolderContent(files, path);
                if (content) {
                    Object.entries(content).forEach(([name, entry]) => {
                        if (entry.type === 'folder') {
                            output.push(`drw-r--r--  ${name}/`);
                        } else {
                            output.push(`-rw-r--r--  ${name}`);
                        }
                    });
                } else {
                    output.push(`ls: cannot access '${path}': No such file or directory`);
                }
                break;
            case 'cat':
                if (args.length === 0) {
                  output.push('Usage: cat <file_path>');
                  break;
                }
                 if (!files) {
                   output.push('Error: No file system loaded.');
                   break;
                }
                const fileContent = getRawFileContent(files, args[0]);
                if (fileContent !== null) {
                    output.push(fileContent);
                } else {
                    output.push(`cat: ${args[0]}: No such file or directory`);
                }
                break;
            case 'node':
                 if (args[0] === 'server.js' && files?.['server.js']) {
                    output.push('Server running on port 3001');
                 } else {
                    output.push(`node: cannot find module '${args[0]}'`);
                 }
                break;
            case 'platypus':
                const task = args[1] as keyof typeof aiResponses;
                const response = aiResponses[task];
                if (args[0] === 'create' && response) {
                    for (const line of response.terminal) {
                        setHistory(prev => [...prev, `$ ${commandStr}`, ...response.terminal.slice(0, response.terminal.indexOf(line) + 1)]);
                        await new Promise(res => setTimeout(res, 150));
                    }
                    onGenerationComplete();
                } else {
                    output.push(`platypus: unknown command '${commandStr}'. See sidebar for examples.`);
                }
                break;
            case undefined: // User just pressed enter
                break;
            default:
                output.push(`command not found: ${command}`);
        }
        setHistory(prev => [...prev, ...output]);
    }

    const processCommand = async (commandToProcess: string) => {
      setHistory(prev => [...prev, `$ ${commandToProcess}`]);
      if (commandToProcess) {
        setCommandHistory(prev => [commandToProcess, ...prev]);
      }
      setHistoryIndex(-1);
      setInput('');
      setIsProcessing(true);
      await executeCommand(commandToProcess);
      setIsProcessing(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isProcessing) {
            e.preventDefault();
            processCommand(input);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
          } else {
            setHistoryIndex(-1);
            setInput('');
          }
        }
    };

  return (
    <div className="h-48 flex-shrink-0 bg-[#1e1e1e] border-t border-black/50 flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div className="flex-shrink-0 p-2 border-b border-black/50 flex items-center gap-2">
        <TerminalIcon />
        <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400">Terminal</h3>
      </div>
      <div className="flex-grow p-2 overflow-y-auto text-xs">
        {history.map((line, index) => {
          if (typeof line !== 'string') return null;
          const isPrompt = line.startsWith('$ ');
          const displayLine = isPrompt ? line.substring(2) : line;

          return (
            <div key={index} className="flex whitespace-pre-wrap">
              {isPrompt ? (
                 <><span className="text-gray-500 mr-2 select-none">$</span><span>{displayLine}</span></>
              ) : (
                <span className={line.startsWith('✓') ? 'text-green-400' : ''}>{line}</span>
              )}
            </div>
          );
        })}
        {!isProcessing && (
            <div className="flex">
                <span className="text-gray-500 mr-2 select-none">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isProcessing}
                />
            </div>
        )}
        <div ref={endOfTerminalRef} />
      </div>
    </div>
  );
};

export default TerminalPanel;