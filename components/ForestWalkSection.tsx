import React from 'react';
import { WalkingPlatypusSVG } from './PlatypusPlaceholders';

const ForestWalkSection: React.FC = () => {
    return (
        <section 
            className="relative w-full h-80 md:h-[500px] overflow-hidden forest-background rounded-2xl shadow-xl"
            role="img"
            aria-label="A vibrant green cartoon hill dotted with colorful wildflowers under a bright blue sky."
        >
            <div className="absolute top-0 left-0 w-full h-full animate-walk-forest">
                <WalkingPlatypusSVG className="absolute bottom-0 w-48 md:w-56 h-auto" />
            </div>
        </section>
    );
};

export default ForestWalkSection;