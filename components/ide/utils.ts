import type { FileSystem, File, Folder } from './types';

function traverse(fs: FileSystem, path: string): { parent: Folder | FileSystem, node: File | Folder | null, key: string } | null {
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return null;

  let current: File | Folder | FileSystem = fs;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextNode = (current as Folder).children?.[part] ?? (current as FileSystem)[part];
    if (!nextNode || nextNode.type === 'file') return null; // Path is invalid
    current = nextNode;
  }
  
  const key = parts[parts.length - 1];
  const parent = current as Folder | FileSystem;
  const node = (parent as Folder).children?.[key] ?? (parent as FileSystem)[key] ?? null;

  return { parent, node, key };
}

export const getRawFileContent = (fs: FileSystem, path: string): string | null => {
  const result = traverse(fs, path);
  if (result?.node?.type === 'file') {
    return result.node.rawContent;
  }
  return null;
};

export const getFolderContent = (fs: FileSystem, path: string): { [name: string]: File | Folder } | null => {
  if (path === '/' || path === '' || path === '.') return fs;
  
  const result = traverse(fs, path);
  if (result?.node?.type === 'folder') {
    return result.node.children;
  }
  return null;
};

export const updateFileContent = (fs: FileSystem, path: string, newRawContent: string): { fs: FileSystem; error?: string } => {
    const newFs = JSON.parse(JSON.stringify(fs));
    const result = traverse(newFs, path);

    if (result && result.node && result.node.type === 'file') {
        (result.node as File).rawContent = newRawContent;
        return { fs: newFs };
    }

    return { fs, error: `File not found at path: ${path}` };
}

export const addFileSystemEntry = (fs: FileSystem, path: string, newEntry: File | Folder): { fs: FileSystem, error?: string } => {
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { fs, error: 'Invalid path.' };

  const newFs = JSON.parse(JSON.stringify(fs));
  const dirPath = parts.slice(0, -1).join('/');
  const entryName = parts[parts.length - 1];

  let parent: Folder | FileSystem = newFs;
  if(dirPath) {
    const parentResult = traverse(newFs, dirPath);
    if (!parentResult || parentResult.node?.type !== 'folder') {
      return { fs, error: `Directory not found: ${dirPath}`};
    }
    parent = parentResult.node as Folder;
  }

  const children = (parent as Folder).children ?? parent;
  if (children[entryName]) {
    return { fs, error: `File or directory already exists: ${entryName}` };
  }
  children[entryName] = newEntry;

  return { fs: newFs };
};

export const removeFileSystemEntry = (fs: FileSystem, path: string): { fs: FileSystem; error?: string } => {
    const newFs = JSON.parse(JSON.stringify(fs));
    const result = traverse(newFs, path);

    if (result) {
        const { parent, node, key } = result;
        if (!node) return { fs: fs, error: `Cannot remove '${path}': No such file or directory` };
        
        if (node.type === 'folder' && Object.keys(node.children).length > 0) {
            return { fs: fs, error: `Cannot remove '${key}': Directory not empty` };
        }
        
        const children = (parent as Folder).children ?? parent;
        delete children[key];
        return { fs: newFs };
    }

    return { fs: fs, error: `Cannot remove '${path}': Path is invalid` };
};
