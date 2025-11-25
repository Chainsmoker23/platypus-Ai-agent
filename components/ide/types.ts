export interface File {
  type: 'file';
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
}

export type AiResponses = {
    [key: string]: AiResponse;
};

export interface ExamplePrompt {
  id: keyof AiResponses;
  text: string;
}
