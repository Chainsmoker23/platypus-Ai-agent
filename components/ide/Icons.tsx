import React from 'react';

export const FileIcon: React.FC = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.75 1.75a.75.75 0 00-1.5 0v12.5c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75V5.56l-3.56-3.561L11.5 2H4.75zM8.5 2.5v2.75c0 .138.112.25.25.25h2.75l-3-3zM4.5 14V2.5h3.25V5.5A1.75 1.75 0 009.5 7.25h2.75V14h-8z"></path>
    </svg>
);

export const FolderIcon: React.FC = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg">
        <path d="M.5 2A1.5 1.5 0 012  S.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h12a.5.5 0 00.5-.5V4.5a.5.5 0 00-.5-.5h-6.25a.25.25 0 01-.2-.1l-.9-1.2A.25.25 0 005.5 2.5H2zM1.5 3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H6a.5.5 0 01-.4-.2L4.2 2.7A.5.5 0 003.8 2.5H1.5z"></path>
    </svg>
);

export const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className || "w-4 h-4"} xmlns="http://www.w3.org/2000/svg">
        <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
    </svg>
);

export const TerminalIcon: React.FC = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm10.5 9.5a.75.75 0 100-1.5.75.75 0 000 1.5zM3.5 4.25a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25h-8a.25.25 0 00-.25.25V5h-1V4.25zm-2-.25a1.75 1.75 0 011.75-1.75h11a1.75 1.75 0 011.75 1.75v7.5a1.75 1.75 0 01-1.75 1.75H1.75A1.75 1.75 0 010 11.75V4a1.75 1.75 0 011.5-1.75z"></path>
        <path d="M4.43 6.42a.5.5 0 01.71-.05l2 1.75a.5.5 0 010 .76l-2 1.75a.5.5 0 11-.66-.76L6.16 8 4.48 6.71a.5.5 0 01-.05-.7z"></path>
    </svg>
);

export const ChevronRightIcon: React.FC = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg>
);

export const ChevronDownIcon: React.FC = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><path d="M4.47 6.22a.75.75 0 011.06 0L8 8.69l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z"></path></svg>
);

export const FilesIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13.172 12.828a4 4 0 1 1-5.657-5.657 4 4 0 0 1 5.657 5.657Z"></path><path d="M12.828 13.172a4 4 0 1 1-5.657 5.657 4 4 0 0 1 5.657-5.657Z"></path><path d="M7.172 7.172a4 4 0 1 1 5.657-5.657 4 4 0 0 1-5.657 5.657Z"></path><path d="M18.828 7.172a4 4 0 1 1-5.657-5.657 4 4 0 0 1 5.657 5.657Z"></path></svg>
);

export const CopyIcon: React.FC = () => (
    // FIX: Corrected SVG attribute 'strokeLineCap' to 'strokeLinecap' and 'strokeLineJoin' to 'strokeLinejoin'.
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);

export const CheckIcon: React.FC = () => (
    // FIX: Corrected SVG attribute 'strokeLineCap' to 'strokeLinecap' and 'strokeLineJoin' to 'strokeLinejoin'.
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
);