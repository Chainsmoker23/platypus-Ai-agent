import React from 'react';
import { FileCodeIcon } from './ide/Icons';

interface MentionPopoverProps {
    results: string[];
    activeIndex: number;
    onSelect: (path: string) => void;
}

const MentionPopover: React.FC<MentionPopoverProps> = ({ results, activeIndex, onSelect }) => {
    if (results.length === 0) {
        return null;
    }

    return (
        <div className="mention-popover">
            {results.map((path, index) => {
                const parts = path.split('/');
                const fileName = parts.pop();
                const dirPath = parts.join('/');

                return (
                    <div
                        key={path}
                        className={`mention-item ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => onSelect(path)}
                        // Scroll into view if it's the active item
                        ref={el => el && index === activeIndex && el.scrollIntoView({ block: 'nearest' })}
                    >
                        <FileCodeIcon />
                        <span className="path-main">{fileName}</span>
                        <span className="path-dir">{dirPath}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default MentionPopover;