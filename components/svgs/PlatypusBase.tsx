
import React, { useState, useEffect } from 'react';

export type EyeExpression = 'default' | 'focused' | 'curious';

export const EyeStyles: React.FC = (): React.ReactElement => (
    <style>{`
        @keyframes blink_anim {
            0%, 95%, 100% { transform: scaleY(1); }
            97.5% { transform: scaleY(0.1); }
        }
        @keyframes pupil_move_anim {
            0%, 40%, 100% { transform: translateX(0); }
            50%, 70% { transform: translateX(1px); }
            80%, 90% { transform: translateX(-1px); }
        }
        .eye-group { 
            transform-origin: center;
            animation-name: blink_anim;
            animation-iteration-count: infinite;
        }
        .pupil { 
            transform-origin: center;
        }
        .pupil-curious {
            animation: pupil_move_anim 5s infinite 0.5s;
        }
    `}</style>
);

export const Eyes: React.FC<{ expression?: EyeExpression }> = ({ expression = 'default' }): React.ReactElement => {
    const pupilStyle = expression === 'focused' ? { r: 3.5 } : { r: 3 };
    const animationDuration = expression === 'focused' ? '6s' : '4s';
    const [delays, setDelays] = useState({ left: '0s', right: '0s' });

    useEffect(() => {
        const randomDelay = Math.random() * 3;
        setDelays({
            left: `${randomDelay.toFixed(2)}s`,
            right: `${(randomDelay + 0.2 + Math.random() * 0.2).toFixed(2)}s`
        });
    }, []);

    const pupilClassName = `pupil ${expression === 'curious' ? 'pupil-curious' : ''}`;

    return (
        <g>
            {/* Left Eye */}
            <g className="eye-group" style={{ animationDuration, animationDelay: delays.left }} transform="rotate(-10 95 68)">
                <ellipse cx="95" cy="68" rx="7" ry="11" fill="white" />
                <circle cx="97" cy="70" {...pupilStyle} fill="black" className={pupilClassName}/>
            </g>
            {/* Right Eye */}
            <g className="eye-group" style={{ animationDuration, animationDelay: delays.right }} transform="rotate(10 120 68)">
                <ellipse cx="120" cy="68" rx="7" ry="11" fill="white" />
                <circle cx="118" cy="70" {...pupilStyle} fill="black" className={pupilClassName}/>
            </g>
        </g>
    );
};

export interface PlatypusBaseSVGProps {
  children?: React.ReactNode;
  accessories?: React.ReactNode; // Renders ON TOP of body
  backgroundContent?: React.ReactNode; // Renders BEHIND body
  foregroundContent?: React.ReactNode; // Renders ON TOP of everything (even accessories)
  title: string;
  titleId: string;
  sitting?: boolean;
  defs?: React.ReactNode;
  expression?: EyeExpression;
  className?: string;
  noLegs?: boolean;
  bodyClassName?: string;
}

export const PlatypusBaseSVG: React.FC<PlatypusBaseSVGProps> = ({ 
    children, 
    accessories, 
    backgroundContent,
    foregroundContent,
    title, 
    titleId, 
    sitting = false, 
    defs, 
    expression, 
    className, 
    noLegs = false, 
    bodyClassName = "" 
}): React.ReactElement => {
    return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} className={className}>
        <title id={titleId}>{title}</title>
        <defs>
            <pattern id="tailGridBase" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0,0 L 10,10 M 10,0 L 0,10" stroke="#EA580C" strokeWidth="1.5"/>
            </pattern>
            <EyeStyles />
            {defs}
        </defs>
        <g transform="translate(10, 0)" className={bodyClassName}>
            
            {/* 0. Background Layer (e.g., Back of boat interior) */}
            {backgroundContent}

            {/* 1. Tail */}
            <path d={sitting ? "M110,160 C 160,150 180,195 130,198 C 100,200 95,170 110,160 Z" : "M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z"} fill="#F97316"/>
            <path d={sitting ? "M110,160 C 160,150 180,195 130,198 C 100,200 95,170 110,160 Z" : "M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z"} fill="url(#tailGridBase)"/>

            {/* 2. Legs - conditionally rendered */}
            {!noLegs && (
                sitting ? (
                    <>
                        <path d="M85,175 C 75,190 105,190 95,175 L 100,165 L 85,168 Z" fill="#F97316" />
                        <path d="M115,178 C 105,193 135,193 125,178 L 130,168 L 115,171 Z" fill="#F97316" />
                    </>
                ) : (
                    <>
                        <path d="M80,175 C 70,190 100,190 90,175 L 90,165 L 75,168 Z" fill="#F97316" />
                        <path d="M120,178 C 110,193 140,193 130,178 L 130,168 L 115,171 Z" fill="#F97316" />
                    </>
                )
            )}
            
            {/* 3. Body */}
            <path d="M80,70 C 70,120 70,180 85,180 L 125,180 C 140,180 140,120 130,70 Z" fill="#7ADAA5"/>
            
            {/* 4. Custom Body Content (e.g., arms that go behind head but in front of body) */}
            {children}

            {/* 5. Head and Bill */}
            <path d="M80,80 C 65,65 145,65 130,80 C 140,40 70,40 80,80 Z" fill="#7ADAA5"/>
            <path d="M70,85 C 50,105 160,105 140,85 L 130,80 L 80,80 Z" fill="#F97316" />
            {/* Nostrils */}
            <g fill="#EA580C">
                <ellipse cx="98" cy="88" rx="2.5" ry="1.5" transform="rotate(-10 98 88)" />
                <ellipse cx="112" cy="88" rx="2.5" ry="1.5" transform="rotate(10 112 88)" />
            </g>
            
            {/* 6. Eyes */}
            <Eyes expression={expression} />
            
            {/* 7. Accessories (e.g., Hats, Glasses) */}
            {accessories}

            {/* 8. Foreground (e.g., Boat Hull covering legs) */}
            {foregroundContent}
        </g>
    </svg>
    );
};
