import React, { useState, memo } from 'react';
import type { FileSystem, File, Folder } from './types';
import { FileIcon, FolderIcon, ChevronDownIcon, ChevronRightIcon, DeleteIcon } from './Icons';

interface FileExplorerProps {
  files: FileSystem | null;
  onFileSelect: (path: string) => void;
  onFileDelete: (path: string) => void;
}

interface FileEntryProps {
    name: string; 
    path: string; 
    onFileSelect: (path: string) => void; 
    onFileDelete: (path: string) => void; 
    level: number;
}

const FileEntry: React.FC<FileEntryProps> = ({ name, path, onFileSelect, onFileDelete, level }) => {
  return (
    <div 
      className="group flex items-center justify-between p-1 cursor-pointer hover:bg-white/10 rounded" 
      style={{ paddingLeft: `${level * 12 + 4}px` }}
      onClick={() => onFileSelect(path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onFileSelect(path)}
    >
      <div className="flex items-center truncate">
        <FileIcon />
        <span className="ml-2 truncate">{name}</span>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onFileDelete(path); }} 
        className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/20 flex-shrink-0"
        aria-label={`Delete ${name}`}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

interface FolderEntryProps {
    name: string; 
    entry: Folder; 
    path: string; 
    onFileSelect: (path: string) => void; 
    onFileDelete: (path: string) => void; 
    level: number;
}

const FolderEntry: React.FC<FolderEntryProps> = ({ name, entry, path, onFileSelect, onFileDelete, level }) => {
  const [isOpen, setIsOpen] = useState(true);

  // FIX: Explicitly typed sort function arguments to resolve TypeScript error 'Property 'type' does not exist on type 'unknown''.
  const sortedChildren = Object.entries(entry.children).sort(([aName, a]: [string, File | Folder], [bName, b]: [string, File | Folder]) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return aName.localeCompare(bName);
  });

  return (
    <div className="group">
      <div
        className="flex items-center justify-between p-1 cursor-pointer hover:bg-white/10 rounded"
        onClick={() => setIsOpen(!isOpen)}
        style={{ paddingLeft: `${level * 12 + 4}px` }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center truncate">
          {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          <FolderIcon />
          <span className="ml-2 truncate">{name}</span>
        </div>
      </div>
      {isOpen && (
        <div>
          {sortedChildren.map(([childName, childEntry]) => (
            <ExplorerNode
              key={childName}
              name={childName}
              entry={childEntry}
              path={`${path}/${childName}`}
              onFileSelect={onFileSelect}
              onFileDelete={onFileDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ExplorerNodeProps {
    name: string; 
    entry: File | Folder; 
    path: string; 
    onFileSelect: (path: string) => void; 
    onFileDelete: (path: string) => void; 
    level: number;
}

const ExplorerNode: React.FC<ExplorerNodeProps> = (props) => {
  if (props.entry.type === 'folder') {
    return <FolderEntry {...props} entry={props.entry} />;
  }
  return <FileEntry {...props} />;
};

const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect, onFileDelete }) => {
  if (!files) {
    return <div className="p-2 text-gray-400 text-xs">Generating file structure...</div>;
  }

  // FIX: Explicitly typed sort function arguments to resolve TypeScript error 'Property 'type' does not exist on type 'unknown''.
  const sortedFiles = Object.entries(files).sort(([aName, a]: [string, File | Folder], [bName, b]: [string, File | Folder]) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return aName.localeCompare(bName);
  });

  return (
    <div className="p-1" role="tree">
      {sortedFiles.map(([name, entry]) => (
        <ExplorerNode
          key={name}
          name={name}
          entry={entry}
          path={name}
          onFileSelect={onFileSelect}
          onFileDelete={onFileDelete}
          level={0}
        />
      ))}
    </div>
  );
};

export default memo(FileExplorer);