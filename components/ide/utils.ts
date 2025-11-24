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

export const getRawFileContent = (files: FileSystem, path: string): string | null => {
    const file = getFile(files, path);
    return file ? file.rawContent : null;
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

const recursiveAdd = (level: FileSystem, pathParts: string[], newEntry: File | Folder): { level: FileSystem, error?: string } => {
  const part = pathParts[0];
  const newLevel = { ...level };

  if (pathParts.length === 1) {
    if (newLevel[part]) {
      return { level, error: `cannot create file '${part}': File exists` };
    }
    newLevel[part] = newEntry;
    return { level: newLevel };
  }

  const nextNode = newLevel[part];
  if (!nextNode || nextNode.type !== 'folder') {
    return { level, error: `cannot create directory '${pathParts.join('/')}': No such file or directory` };
  }

  const result = recursiveAdd(nextNode.children, pathParts.slice(1), newEntry);
  if (result.error) {
    return { level, error: result.error };
  }
  
  newLevel[part] = { ...nextNode, children: result.level };
  return { level: newLevel };
};

export const addFileSystemEntry = (fs: FileSystem, path: string, newEntry: File | Folder): { fs: FileSystem, error?: string } => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return { fs, error: 'Invalid path.' };
    const { level, error } = recursiveAdd(fs, parts, newEntry);
    return { fs: level, error };
};

const recursiveRemove = (level: FileSystem, pathParts: string[]): { level: FileSystem, error?: string } => {
    const part = pathParts[0];
    const newLevel = { ...level };
    const nodeToRemove = newLevel[part];

    if (!nodeToRemove) {
        return { level, error: `cannot remove '${pathParts.join('/')}': No such file or directory` };
    }

    if (pathParts.length === 1) {
        if (nodeToRemove.type === 'folder' && Object.keys(nodeToRemove.children).length > 0) {
            return { level, error: `cannot remove '${part}': Directory not empty` };
        }
        delete newLevel[part];
        return { level: newLevel };
    }
    
    if (nodeToRemove.type !== 'folder') {
       return { level, error: `cannot remove part of path '${part}': Not a directory` };
    }

    const result = recursiveRemove(nodeToRemove.children, pathParts.slice(1));
    if (result.error) {
        return { level, error: result.error };
    }

    newLevel[part] = { ...nodeToRemove, children: result.level };
    return { level: newLevel };
};

export const removeFileSystemEntry = (fs: FileSystem, path: string): { fs: FileSystem, error?: string } => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return { fs, error: 'Invalid path.' };
    const { level, error } = recursiveRemove(fs, parts);
    return { fs: level, error };
};


const recursiveUpdate = (level: FileSystem, pathParts: string[], newRawContent: string, newJsxContent: React.ReactNode): { level: FileSystem, error?: string } => {
  const part = pathParts[0];
  const newLevel = { ...level };
  const nodeToUpdate = newLevel[part];

  if (!nodeToUpdate) {
    return { level, error: `cannot update '${pathParts.join('/')}': No such file or directory` };
  }

  if (pathParts.length === 1) {
    if (nodeToUpdate.type !== 'file') {
      return { level, error: `cannot update '${part}': Not a file` };
    }
    newLevel[part] = { ...nodeToUpdate, rawContent: newRawContent, content: newJsxContent };
    return { level: newLevel };
  }

  if (nodeToUpdate.type !== 'folder') {
    return { level, error: `cannot update part of path '${part}': Not a directory` };
  }

  const result = recursiveUpdate(nodeToUpdate.children, pathParts.slice(1), newRawContent, newJsxContent);
  if (result.error) {
    return { level, error: result.error };
  }
  
  newLevel[part] = { ...nodeToUpdate, children: result.level };
  return { level: newLevel };
}


export const updateFileContent = (fs: FileSystem, path: string, newRawContent: string, newJsxContent: React.ReactNode): { fs: FileSystem, error?: string } => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return { fs, error: 'Invalid path.' };
    const { level, error } = recursiveUpdate(fs, parts, newRawContent, newJsxContent);
    return { fs: level, error };
}