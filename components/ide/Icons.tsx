import React from 'react';

type IconProps = {
  className?: string;
};

export const FileIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 text-gray-400 ${className}`} aria-hidden="true">
        <path d="M4.75 1.75a.75.75 0 00-1.5 0v12.5c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75V5.56l-3.56-3.561L11.5 2H4.75zM8.5 2.5v2.75c0 .138.112.25.25.25h2.75l-3-3zM4.5 14V2.5h3.25V5.5A1.75 1.75 0 009.5 7.25h2.75V14h-8z"></path>
    </svg>
);

export const FolderIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 text-gray-400 ${className}`} aria-hidden="true">
        <path d="M.5 2A1.5 1.5 0 012 .5h3a.5.5 0 01.4.2L6.8 2H14a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0114 13H2a1.5 1.5 0 01-1.5-1.5v-9A.5.5 0 01.5 2zM2 1.5a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h12a.5.5 0 00.5-.5v-8a.5.5 0 00-.5-.5H6.8a.5.5 0 01-.4-.2L5 1.7A.5.5 0 004.6 1.5H2z"></path>
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className || "w-3.5 h-3.5"} aria-hidden="true">
        <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
    </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className || "w-3.5 h-3.5"} aria-hidden="true">
        <path fillRule="evenodd" d="M6.5 1.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75V3h-3V1.75zM3 3.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM3.75 4.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75h-8.5zM5.25 6a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0v-5A.75.75 0 015.25 6zm3.5 0a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0v-5a.75.75 0 01.75-.75z"></path>
    </svg>
);

export const TerminalIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 ${className}`} aria-hidden="true">
        <path d="M4.43 6.42a.5.5 0 01.71-.05l2 1.75a.5.5 0 010 .76l-2 1.75a.5.5 0 11-.66-.76L6.16 8 4.48 6.71a.5.5 0 01-.05-.7z"></path>
        <path d="M1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H1.75zM0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75z"></path>
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 ${className}`} aria-hidden="true"><path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 ${className}`} aria-hidden="true"><path d="M4.47 6.22a.75.75 0 011.06 0L8 8.69l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z"></path></svg>
);

export const FilesIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`} aria-hidden="true"><path d="M3,5H1V19a2,2,0,0,0,2,2H18V21H3a2,2,0,0,1-2-2V5H3M21,1H7A2,2,0,0,0,5,3V15a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V3a2,2,0,0,0-2-2Z"></path></svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`} aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${className}`} aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
);

export const CopyIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={`w-4 h-4 text-green-400 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
);

export const BackIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);
