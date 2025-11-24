// FIX: Import React to use React.ReactNode type.
import React from 'react';
import type { FileSystem, File, Folder } from './types';

const getFile = (files: FileSystem, path: string): File | null => {
  const parts = path.split('/');
  let current: File | Folder | FileSystem = files;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if ((current as File).type === 'file') return null; // Can't go deeper
    
    const children = (current as Folder).type === 'folder' ? (current as Folder).children : (current as FileSystem);
    if (!children[part]) return null; // Not found

    current = children[part];
  }

  return (current as File).type === 'file' ? (current as File) : null;
};


export const getFileContent = (files: FileSystem, path: string): React.ReactNode | null => {
    const file = getFile(files, path);
    return file ? file.content : null;
};

export const getRawFileContent = (files: FileSystem, path: string): string => {
    const file = getFile(files, path);
    return file ? file.rawContent : '';
}
