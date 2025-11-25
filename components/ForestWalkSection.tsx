import React from 'react';
import { ForestFloorSVG, WalkingPlatypusSVG } from './PlatypusPlaceholders';

const ForestWalkSection: React.FC = () => {
    return (
        <section className="relative w-full h-48 md:h-64 overflow-hidden">
            <ForestFloorSVG />
            <div className="absolute top-0 left-0 w-full h-full animate-walk-forest">
                <WalkingPlatypusSVG className="absolute bottom-0 w-40 md:w-48 h-auto" />
            </div>
        </section>
    );
};

export default ForestWalkSection;
