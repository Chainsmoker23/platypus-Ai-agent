// FIX: Import React to use React.ReactNode type.
import React from 'react';

export interface File {
  type: 'file';
  content: React.ReactNode;
  rawContent: string;
}

export interface Folder {
  type: 'folder';
  children: { [name: string]: File | Folder };
}

export type FileSystem = { [name: string]: File | Folder };

export interface AiResponse {
    files: FileSystem;
    terminal: string[];
    openTabs: string[];
    initialActiveTab: string;
}

export type AiResponses = {
    [key: string]: AiResponse;
};
