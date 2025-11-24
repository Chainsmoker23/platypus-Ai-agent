// FIX: Import React to use React.ReactNode type.
import React from 'react';
import type { FileSystem, File, Folder } from './types';

const getFile = (files: FileSystem, path: string): File | null => {
  const parts = path.split('/').filter(p => p);
  let current: File | Folder | FileSystem = files;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if ((current as File).type === 'file') return null; // Can't go deeper
    
    const children = (current as Folder).type === 'folder' ? (current as Folder).children : (current as FileSystem);
    if (!children || !children[part]) return null; // Not found

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

export const getFolderContent = (files: FileSystem, path: string): { [name: string]: File | Folder } | null => {
  if (path === '/' || path === '' || path === '.') {
    return files;
  }
  const parts = path.split('/').filter(p => p);
  let current: File | Folder | FileSystem = files;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if ((current as File).type === 'file') return null;
    
    const children = (current as Folder).type === 'folder' ? (current as Folder).children : (current as FileSystem);
    if (!children || !children[part]) return null;

    current = children[part];
  }

  return (current as Folder).type === 'folder' ? (current as Folder).children : null;
};