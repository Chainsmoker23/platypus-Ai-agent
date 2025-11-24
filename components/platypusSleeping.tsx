import React, { useState, useEffect } from 'react';

const PlatypusSleeping: React.FC<{ className?: string }> = ({ className }) => {
    const [delays, setDelays] = useState({ left: '0s', right: '0s' });

    useEffect(() => {
        const randomDelay = Math.random() * 4; // base delay up to 4s for slower feel
        setDelays({
            left: `${randomDelay.toFixed(2)}s`,
            right: `${(randomDelay + 0.5 + Math.random() * 0.5).toFixed(2)}s`
        });
    }, []);

    return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="platypus-sleeping-title">
        <title id="platypus-sleeping-title">A platypus sleeping peacefully on a pillow, representing data security and privacy.</title>
        <defs>
            <radialGradient id="pillowGradientSleeping" cx="0.5" cy="0.5" r="0.7">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#EBF8FF" />
            </radialGradient>
            <pattern id="tailGridSleeping" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0,0 L 10,10 M 10,0 L 0,10" stroke="#C05621" strokeWidth="1.5"/>
            </pattern>
            <style>
                {`
                    .zzz {
                        font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
                        font-weight: bold;
                        fill: #5DA9E9;
                        opacity: 0;
                        animation: float-up 3s ease-in-out infinite;
                    }
                    @keyframes float-up {
                        0% { transform: translate(0, 0); opacity: 0; }
                        20% { opacity: 0.8; }
                        80% { opacity: 0.8; }
                        100% { transform: translate(-10px, -40px); opacity: 0; }
                    }
                    .zzz:nth-of-type(2) { animation-delay: 1s; }
                    .zzz:nth-of-type(3) { animation-delay: 2s; }

                    @keyframes eye-twitch {
                        0%, 98%, 100% { transform: translateY(0); }
                        99% { transform: translateY(-0.5px); }
                    }
                    .eye-twitch { 
                        animation-name: eye-twitch;
                        animation-duration: 5s;
                        animation-iteration-count: infinite;
                    }
                `}
            </style>
        </defs>
        <g transform="translate(10, 0)">
            {/* Tail */}
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="#ED8936"/>
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="url(#tailGridSleeping)"/>
            
            {/* Legs */}
            <path d="M80,175 C 70,190 100,190 90,175 L 90,165 L 75,168 Z" fill="#ED8936" />
            <path d="M120,178 C 110,193 140,193 130,178 L 130,168 L 115,171 Z" fill="#ED8936" />
            
            {/* Body */}
            <path d="M80,70 C 70,120 70,180 85,180 L 125,180 C 140,180 140,120 130,70 Z" fill="#38B2AC"/>

            {/* Pillow */}
            <g>
                <path d="M80 100 C 50 100, 55 160, 80 160 L 130 160 C 155 160, 160 100, 130 100 Z" fill="url(#pillowGradientSleeping)" stroke="#CBD5E0" strokeWidth="0.5" />
                <path d="M90,105 C 80,125, 85,145, 90,155" stroke="#E2E8F0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                <path d="M120,105 C 130,125, 125,145, 120,155" stroke="#E2E8F0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
            </g>

            {/* Arms hugging the pillow */}
            <g>
                <path d="M132,95 C 140,120 130,140 120,140 Z" fill="#319795" />
                <path d="M120,140 C 130,150 145,135,130,130 L 122,138 Z" fill="#ED8936" />
                <path d="M78,95 C 70,120 80,140 90,140 Z" fill="#319795" />
                <path d="M90,140 C 80,150 65,135 80,130 L 88,138 Z" fill="#ED8936" />
            </g>
            
            {/* Head and Bill */}
            <path d="M80,80 C 65,65 145,65 130,80 C 140,40 70,40 80,80 Z" fill="#38B2AC"/>
            <path d="M70,85 C 50,105 160,105 140,85 L 130,80 L 80,80 Z" fill="#ED8936" />
            {/* Nostrils */}
            <g fill="#C05621">
                <ellipse cx="98" cy="88" rx="2.5" ry="1.5" transform="rotate(-10 98 88)" />
                <ellipse cx="112" cy="88" rx="2.5" ry="1.5" transform="rotate(10 112 88)" />
            </g>
            
            {/* Sleeping Eyes */}
            <path className="eye-twitch" style={{ animationDelay: delays.left }} d="M90 68 C 95 73, 100 73, 105 68" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path className="eye-twitch" style={{ animationDelay: delays.right }} d="M115 68 C 120 73, 125 73, 130 68" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            
            {/* Zzz animation */}
            <g transform="translate(135, 60)">
                <text x="0" y="0" className="zzz" fontSize="12">Z</text>
                <text x="5" y="-10" className="zzz" fontSize="16">z</text>
                <text x="10" y="-20" className="zzz" fontSize="20">z</text>
            </g>
        </g>
    </svg>
    );
};

export default PlatypusSleeping;
