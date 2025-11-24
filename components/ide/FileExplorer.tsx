import React, { useState } from 'react';
import type { FileSystem, File, Folder } from './types';
import { FileIcon, FolderIcon, ChevronDownIcon, ChevronRightIcon } from './Icons';

interface FileExplorerProps {
  files: FileSystem | null;
  onFileSelect: (path: string) => void;
}

const FileExplorerEntry: React.FC<{
  name: string;
  entry: File | Folder;
  path: string;
  onFileSelect: (path: string) => void;
  level: number;
}> = ({ name, entry, path, onFileSelect, level }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (entry.type === 'folder') {
    return (
      <div>
        <div
          className="flex items-center p-1 cursor-pointer hover:bg-white/10 rounded"
          onClick={() => setIsOpen(!isOpen)}
          style={{ paddingLeft: `${level * 12 + 4}px` }}
        >
          {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          <FolderIcon />
          <span className="ml-2">{name}</span>
        </div>
        {isOpen && (
          <div>
            {Object.entries(entry.children)
              // FIX: Explicitly type sort callback parameters to resolve type inference issue.
              .sort(([aName, a]: [string, File | Folder], [bName, b]: [string, File | Folder]) => {
                if (a.type === 'folder' && b.type === 'file') return -1;
                if (a.type === 'file' && b.type === 'folder') return 1;
                return aName.localeCompare(bName);
              })
              .map(([childName, childEntry]) => (
                <FileExplorerEntry
                  key={childName}
                  name={childName}
                  entry={childEntry}
                  path={`${path}/${childName}`}
                  onFileSelect={onFileSelect}
                  level={level + 1}
                />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex items-center p-1 cursor-pointer hover:bg-white/10 rounded"
      onClick={() => onFileSelect(path)}
      style={{ paddingLeft: `${level * 12 + 4}px` }}
    >
      <FileIcon />
      <span className="ml-2">{name}</span>
    </div>
  );
};

const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect }) => {
  if (!files) {
    return (
        <div className="p-2 text-gray-400 text-xs">
            Generating file structure...
        </div>
    );
  }

  return (
    <div className="p-1">
      {Object.entries(files).map(([name, entry]) => (
        <FileExplorerEntry
          key={name}
          name={name}
          entry={entry}
          path={name}
          onFileSelect={onFileSelect}
          level={0}
        />
      ))}
    </div>
  );
};

export default FileExplorer;
