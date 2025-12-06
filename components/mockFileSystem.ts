export interface File {
  type: 'file';
  rawContent: string;
}

export interface Folder {
  type: 'folder';
  children: { [name: string]: File | Folder };
}

export type FileSystem = { [name: string]: File | Folder };

export const mockFileSystem: FileSystem = {
  'src': {
    type: 'folder',
    children: {
      'App.tsx': { type: 'file', rawContent: 'import React from "react";\n\nconst App = () => <div>Hello Platypus!</div>;\n\nexport default App;' },
      'components': {
        type: 'folder',
        children: {
            'Button.tsx': { type: 'file', rawContent: 'const Button = () => <button>Click Me</button>;' },
            'Header.tsx': { type: 'file', rawContent: 'const Header = () => <header>Platypus AI</header>;' }
        }
      },
      'index.css': { type: 'file', rawContent: 'body { margin: 0; }' }
    }
  },
  'package.json': { type: 'file', rawContent: '{ "name": "platypus-demo", "version": "1.0.0" }' },
  'README.md': { type: 'file', rawContent: '# Platypus Demo Project\n\nThis is a sample project to demonstrate context-aware chat.' }
};

// Helper function to flatten the file system into a list of paths and content
const flattenFileSystem = (fs: FileSystem, pathPrefix = ''): { path: string, content: string }[] => {
    let files: { path: string, content: string }[] = [];
    for (const name in fs) {
        const entry = fs[name];
        const currentPath = pathPrefix ? `${pathPrefix}/${name}` : name;
        if (entry.type === 'folder') {
            files = files.concat(flattenFileSystem(entry.children, currentPath));
        } else {
            files.push({ path: currentPath, content: entry.rawContent });
        }
    }
    return files;
};

export const allMockFiles = flattenFileSystem(mockFileSystem);