
import React from 'react';
import { PlatypusBaseSVG } from './PlatypusBase';
import { PlatypusCaptainHat } from './PlatypusCollection';

// Added a prop to receive the interactive state from the parent
export const PlatypusBoatSVG: React.FC<{ className?: string; isInteracting?: boolean }> = ({ className, isInteracting }) => (
    <PlatypusBaseSVG
        className={className}
        titleId="platypus-boat-title"
        title="A platypus captain steering a magical Aetherium Skiff."
        noLegs={true}
        bodyClassName="animate-steering-body"
        defs={[
             <style key="steering-style">{`
                @keyframes steering-body { 0%, 100% { transform: rotate(1deg); } 50% { transform: rotate(-1deg); } }
                .animate-steering-body { animation: steering-body 4s ease-in-out infinite; transform-origin: 100px 180px; }
                
                @keyframes steering-arm { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
                .animate-steering-arm { animation: steering-arm 4s ease-in-out infinite; transform-origin: 132px 95px; }
                
                @keyframes sail-shimmer { 0%, 100% { opacity: 0.6; filter: brightness(1); } 50% { opacity: 0.9; filter: brightness(1.2); } }
                @keyframes circuit-flow { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }

                @keyframes crystal-pulse {
                    0%, 100% { filter: drop-shadow(0 0 4px #A78BFA); opacity: 0.9; }
                    50% { filter: drop-shadow(0 0 15px #C4B5FD); opacity: 1; }
                }
                .interactive-glow {
                    animation: interactive-glow-anim 1s ease-out;
                }
                @keyframes interactive-glow-anim {
                    0%, 100% { filter: drop-shadow(0 0 8px rgba(238, 235, 255, 0)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 30px rgba(238, 235, 255, 1)); transform: scale(1.03); }
                }
             `}</style>,
             <linearGradient key="hull-gradient" id="hull-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#E0E7FF" />
                <stop offset="100%" stopColor="#C7D2FE" />
             </linearGradient>,
             <filter key="crystalGlow" id="crystalGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
             </filter>
        ]}
        
        // Captain's Hat
        accessories={<PlatypusCaptainHat />}

        // 1. BACKGROUND: Mast, Energy Sail
        backgroundContent={
            <g className={isInteracting ? 'interactive-glow' : ''}>
                {/* Mast */}
                <path d="M100,60 L100,180" stroke="url(#hull-gradient)" strokeWidth="4" strokeLinecap="round" />
                
                {/* Energy Sail */}
                <g>
                    <path d="M105,70 Q220,120 105,170" fill="#4338CA" fillOpacity="0.3" style={{ animation: 'sail-shimmer 4s ease-in-out infinite' }} />
                    <path d="M105,70 Q220,120 105,170" fill="none" stroke="#A78BFA" strokeWidth="1.5" />
                    {/* Animated Circuits */}
                    <path d="M105,120 Q150,90 180,100" fill="none" stroke="#E0E7FF" strokeWidth="1" strokeDasharray="5 10" style={{ animation: 'circuit-flow 10s linear infinite' }} />
                    <path d="M105,120 Q160,150 170,140" fill="none" stroke="#E0E7FF" strokeWidth="1" strokeDasharray="3 7" style={{ animation: 'circuit-flow 8s linear infinite reverse' }}/>
                </g>
            </g>
        }

        // 3. CHILDREN: Arms and Tiller
        children={
            <g>
                {/* Left Arm (static) */}
                <path d="M78,95 C 65,115 70,135 85,135 L 95,132 C 98,125 90,110 78,95 Z" fill="#5CB88A" />
                <path d="M85,135 C 80,140 80,145 88,145 L 95,140 Z" fill="#F97316" />
                
                {/* Right Arm (steering) + Tiller */}
                <g className="animate-steering-arm">
                    <path d="M132,95 C 145,115 140,135 125,135 L 115,132 C 112,125 120,110 132,95 Z" fill="#5CB88A" />
                    <path d="M125,135 C 130,140 130,145 122,145 L 115,140 Z" fill="#F97316" />
                </g>
            </g>
        }

        // 4. FOREGROUND: Front Hull, Crystals, Tiller Handle
        foregroundContent={
            <g>
                {/* Tiller Handle (animated with arm) */}
                <g className="animate-steering-arm">
                    <rect x="100" y="130" width="10" height="40" fill="#E0E7FF" transform="rotate(-15, 105, 150)" />
                    <path d="M100,130 L100,125 L110,125 L110,130 Z" fill="#A78BFA" />
                </g>

                <g className={isInteracting ? 'interactive-glow' : ''}>
                    {/* Wider Hull */}
                    <path d="M-40,150 C 30,210 170,210 240,150 L 240,140 C 170,200 30,200 -40,140 Z" fill="url(#hull-gradient)" />
                    <path d="M-45,140 C 25,195 175,195 245,140 L 240,145 C 175,198 25,198 -40,145 Z" fill="#4338CA" />

                    {/* Glowing Crystal Formations */}
                    {/* Stern Crystal */}
                    <g transform="translate(-15, 135)" style={{ animation: 'crystal-pulse 3s infinite' }}>
                        <path d="M0,0 L-10,10 L0,20 L10,10 Z" fill="#C4B5FD" />
                        <path d="M-10,10 L-5,15 L0,20" fill="#A78BFA" />
                    </g>
                    {/* Bow Crystal */}
                    <g transform="translate(215, 135)" style={{ animation: 'crystal-pulse 3s infinite', animationDelay: '0.5s' }}>
                        <path d="M0,0 L-10,10 L0,20 L10,10 Z" fill="#C4B5FD" transform="rotate(90)" />
                        <path d="M-10,10 L-5,15 L0,20" fill="#A78BFA" transform="rotate(90)" />
                    </g>
                </g>
            </g>
        }
    />
);
