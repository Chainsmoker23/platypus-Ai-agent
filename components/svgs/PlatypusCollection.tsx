
import React, { useState, useEffect } from 'react';
import { PlatypusBaseSVG } from './PlatypusBase';

export const PlatypusLogoSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-labelledby="platypus-logo-title">
        <title id="platypus-logo-title">Creative logo of a platypus bill forming an idea lightbulb</title>
        <g>
            <path d="M50 5 C 25 5 25 40 50 40 C 75 40 75 5 50 5 Z" className="fill-platypus-secondary" />
            <rect x="38" y="40" width="24" height="10" className="fill-platypus-secondary" />
            <path d="M25 50 C15,65 85,65 75,50 S50,40 50,40 S35,35 25,50 Z" className="fill-platypus-primary" />
            <circle cx="43" cy="25" r="3" fill="#0A2540" />
            <circle cx="57" cy="25" r="3" fill="#0A2540" />
            <path d="M44 28 Q 50 32 56 28" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
    </svg>
);

// FIX: Added and exported the missing PlatypusCaptainHat component.
export const PlatypusCaptainHat: React.FC = () => (
    <g>
        {/* Hat body (white) */}
        <path d="M75,55 C 70,30 140,30 135,55 L 75,55 Z" fill="white" stroke="#E2E8F0" strokeWidth="0.5" />
        {/* Flat top crease */}
        <path d="M80,32 C 105,38 115,38 130,32 L 130,35 C 115,41 105,41 80,35 Z" fill="#F8FAFC" />
        {/* Brim (black) */}
        <path d="M65,55 C 45,60 165,60 145,55 L 140,53 L 70,53 Z" fill="#2D3748" />
        {/* Gold Band */}
        <rect x="74" y="50" width="62" height="3" fill="#FBBF24" />
        {/* Anchor Symbol */}
        <g transform="translate(105, 42) scale(0.25)" fill="none" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round">
            <circle cx="0" cy="-5" r="5" />
            <path d="M 0,-10 V 10" />
            <path d="M -8,5 C -5,15 5,15 8,5" />
        </g>
    </g>
);

export const PlatypusRocketSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG 
      className={className}
      titleId="platypus-rocket-title" 
      title="A speedy platypus standing next to a rocket, ready for launch."
      defs={[
          <linearGradient key="g1" id="rocketBodyGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E0" />
          </linearGradient>,
          <radialGradient key="g2" id="rocketFlameGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
          </radialGradient>,
          <style key="s1">{`
              @keyframes rocket_flame_anim {
                  0%, 100% { transform: scaleY(1); }
                  25% { transform: scaleY(1.3); }
                  50% { transform: scaleY(1.1); }
                  75% { transform: scaleY(1.4); }
              }
              .rocket-flame {
                  animation: rocket_flame_anim 0.2s infinite;
                  transform-origin: center bottom;
              }
          `}</style>
      ]}
    >
        <g transform="translate(50, 120) rotate(-10)">
            <g className="rocket-flame">
                <path d="M -5,35 L 5,35 L 0,55 Z" fill="url(#rocketFlameGradient)" />
                <path d="M -3,35 L 3,35 L 0,45 Z" fill="#FBBF24" />
            </g>
            <path d="M -4 20 C 0 30, 0 30, 4 20 L 0 35 Z" fill="#c53030" />
            <rect x="-10" y="-10" width="20" height="45" rx="5" fill="url(#rocketBodyGradient)" />
            <path d="M-5,-8 v40 M5,-8 v40" stroke="#A0AEC0" strokeWidth="1" />
            <path d="M-10,15 l0,15 l-8,5 l0,-15 z" fill="#FF6B6B" />
            <path d="M10,15 l0,15 l8,5 l0,-15 z" fill="#FF6B6B" />
            <circle cx="0" cy="5" r="5" fill="#0D92F4" stroke="white" strokeWidth="1.5" />
            <path d="M -10,-10 C -10,-25 10,-25 10,-10 Z" fill="#FF6B6B" />
            <path d="M 0,-22 C 5,-18 5,-12 0,-10" fill="#d9534f" />
        </g>
        <g>
            <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
            <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
        </g>
        <g>
            <path d="M78,95 C 65,100 62,125 72,130 Z" fill="#5CB88A" />
            <path d="M72,130 C 65,140 50,135 55,125 C 53,115 63,113 67,119 L 75,123 C 77,125 74,130 72,130 Z" fill="#F97316" />
        </g>
    </PlatypusBaseSVG>
);

// ... (The rest of the PlatypusCollection.tsx file remains unchanged)
export const PlatypusLaptopSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG 
        className={className}
        titleId="platypus-laptop-title" 
        title="A developer platypus wearing a cowboy hat, sitting with a laptop beside it." 
        sitting={true}
        expression="focused"
        accessories={
          <g>
            <path d="M50,55 C 30,60 180,60 160,55 C 170,45 40,45 50,55 Z" fill="url(#platypusHatGradient)" />
            <path d="M75,55 C 70,25 140,25 135,55 L 75,55 Z" fill="#2D3748" />
            <path d="M105,25 C 115,32 95,32 105,25" fill="#4A5568" />
            <rect x="74" y="50" width="62" height="6" fill="#0A2540" />
            <g filter="url(#platypusCodeGlow)">
                <path d="M98 52 L 95 54.5 L 98 57" stroke="#34D399" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M112 52 L 115 54.5 L 112 57" stroke="#34D399" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
          </g>
        }
        defs={[
            <linearGradient key="lg1" id="laptopScreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0A2540" />
                <stop offset="100%" stopColor="#1a3f66" />
            </linearGradient>,
            <linearGradient key="lg2" id="laptopBody" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#CBD5E0" />
                <stop offset="100%" stopColor="#A0AEC0" />
            </linearGradient>,
            <filter key="f1" id="laptopShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                <feOffset in="blur" dx="3" dy="5" result="offsetBlur"/>
                <feMerge>
                    <feMergeNode in="offsetBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>,
            <linearGradient key="lg3" id="platypusHatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A5568" />
                <stop offset="100%" stopColor="#2D3748" />
            </linearGradient>,
            <filter key="f2" id="platypusCodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feFlood floodColor="#34D399" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        ]}
    >
        <g>
            <path d="M132,95 C 130,120 125,145 120,160 L 128,162 C 135,145 142,120 132,95 Z" fill="#5CB88A" />
            <path d="M120,160 C 128,165 128,155 123,152 Z" fill="#F97316" />
            <path d="M78,95 C 80,120 85,145 90,160 L 82,162 C 75,145 68,120 78,95 Z" fill="#5CB88A" />
            <path d="M90,160 C 82,165 82,155 87,152 Z" fill="#F97316" />
        </g>
        <g transform="translate(35, 163) rotate(-10) scale(0.6)" filter="url(#laptopShadow)">
            <path d="M -55 25 L -57 28 L 57 28 L 55 25 Z" fill="#718096" />
            <path d="M -55 25 L 55 25 L 50 -5 L -50 -5 Z" fill="url(#laptopBody)" />
            <rect x="42" y="5" width="6" height="3" rx="1" fill="#4A5568" />
            <rect x="42" y="10" width="6" height="3" rx="1" fill="#4A5568" />
            <path d="M -8 25 a 5 5 0 0 0 16 0" fill="#A0AEC0" />
            <rect x="-45" y="0" width="38" height="20" rx="2" fill="#2D3748" />
            <rect x="0" y="0" width="45" height="20" rx="2" fill="#2D3748" />
            <rect x="-22" y="10" width="44" height="11" rx="1.5" fill="#4A5568" />
            <rect x="-45" y="-3" width="95" height="2" fill="#A0AEC0" opacity="0.5" />
            <path d="M -30 -6 L 30 -6 L 32 -8 L -32 -8 Z" fill="#4A5568"/>
            <path d="M-55 -75 L 55 -75 L 50 -5 L -50 -5 Z" fill="#718096" />
            <path d="M-52 -72 L 52 -72 L 48 -8 L -48 -8 Z" fill="#4A5568" />
            <rect x="-49" y="-68" width="98" height="58" rx="1" fill="url(#laptopScreen)">
                <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
            </rect>
            <circle cx="0" cy="-64" r="2" fill="#2D3748" />
            <text x="-40" y="-50" fontFamily="monospace" fontSize="8" fill="#34D399">&lt;Platypus</text>
            <text x="-35" y="-40" fontFamily="monospace" fontSize="8" fill="#93C5FD" xmlSpace="preserve"> .isAwesome(true)</text>
            <text x="-40" y="-30" fontFamily="monospace" fontSize="8" fill="#34D399">/&gt;</text>
        </g>
    </PlatypusBaseSVG>
);

export const PlatypusPillowSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG 
      className={className}
      titleId="platypus-pillow-title" 
      title="A calm platypus hugging a fluffy pillow."
      defs={[
        <radialGradient key="g1" id="pillowGradient" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </radialGradient>
      ]}
    >
      <g>
        <path d="M80 100 C 50 100, 55 160, 80 160 L 130 160 C 155 160, 160 100, 130 100 Z" fill="url(#pillowGradient)" stroke="#BFDBFE" strokeWidth="0.5" />
        <path d="M90,105 C 80,125, 85,145, 90,155" stroke="#DBEAFE" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M120,105 C 130,125, 125,145, 120,155" stroke="#DBEAFE" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      </g>
      <g>
          <path d="M132,95 C 140,120 130,140 120,140 Z" fill="#5CB88A" />
          <path d="M120,140 C 130,150 145,135,130,130 L 122,138 Z" fill="#F97316" />
          <path d="M78,95 C 70,120 80,140 90,140 Z" fill="#5CB88A" />
          <path d="M90,140 C 80,150 65,135 80,130 L 88,138 Z" fill="#F97316" />
      </g>
    </PlatypusBaseSVG>
);

export const PlatypusLollipopSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG 
        className={className}
        titleId="platypus-lollipop-title" 
        title="A friendly platypus holding a colorful lollipop."
        defs={[
            <linearGradient key="g1" id="lollipopStick" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="80%" stopColor="#E2E8F0" />
            </linearGradient>,
            <radialGradient key="g2" id="lollipopSwirl">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="16.6%" stopColor="#FBBF24" />
                <stop offset="33.3%" stopColor="#48BB78" />
                <stop offset="50%" stopColor="#5DA9E9" />
                <stop offset="66.6%" stopColor="#9F7AEA" />
                <stop offset="83.3%" stopColor="#ED64A6" />
                <stop offset="100%" stopColor="#FF6B6B" />
            </radialGradient>
        ]}
        accessories={
            <g transform="rotate(-15 80 95)">
                <g>
                     <circle cx="82" cy="85" r="28" fill="url(#lollipopSwirl)" />
                     <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 82 85" to="360 82 85" dur="15s" repeatCount="indefinite" />
                </g>
                <rect x="78" y="110" width="8" height="55" rx="4" fill="url(#lollipopStick)" stroke="#CBD5E0" strokeWidth="0.5" />
                <path d="M82,130 C 68,135 68,115 82,120 Z" fill="#F97316" />
            </g>
        }
    >
        <g>
            <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
            <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
        </g>
        <g transform="rotate(-15 80 95)">
            <path d="M78,95 C 75,105 75,115 78,125 Z" fill="#5CB88A" />
        </g>
    </PlatypusBaseSVG>
);

export const PlatypusMagnifyingGlassSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG 
      className={className}
      titleId="platypus-magnifying-title" 
      title="A curious platypus inspecting with a magnifying glass, holding it downwards."
      expression="curious"
      accessories={
        <g transform="rotate(-15 80 95)">
            <g> 
              <animateTransform attributeName="transform" type="rotate" values="-5 84 125; 10 84 125; -5 84 125" dur="6s" repeatCount="indefinite" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline" />
                <g transform="translate(84, 95)">
                    <circle cx="0" cy="0" r="25" fill="#718096" />
                    <circle cx="0" cy="0" r="21" fill="#FEF6F7" opacity="0.7" />
                    <path d="M-10 -10 A 15 15 0 0 1 10 -5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                </g>
                <rect x="78" y="120" width="12" height="40" rx="6" fill="#718096" />
                <rect x="79" y="121" width="10" height="38" rx="5" fill="#A0AEC0" />
            </g>
            <path d="M84,140 C 70,145 70,125 84,130 Z" fill="#F97316" /> 
        </g>
      }
    >
       <g>
           <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
           <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
       </g>
       <g transform="rotate(-15 80 95)">
            <path d="M78,95 C 75,105 75,115 78,125 Z" fill="#5CB88A" />
       </g>
    </PlatypusBaseSVG>
);

export const PlatypusClipboardSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG className={className} titleId="platypus-clipboard-title" title="An analytical platypus holding a clipboard.">
        <g>
            <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
            <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
        </g>
        <g>
             <path d="M78,95 C 70,80 50,90 55,105 Z" fill="#5CB88A" />
             <g transform="translate(50,110) rotate(20)">
                <rect x="-20" y="-30" width="40" height="55" rx="3" fill="#D69E2E" />
                <rect x="-18" y="-28" width="36" height="51" rx="2" fill="white" />
                <line x1="-15" y1="-15" x2="15" y2="-15" stroke="#E2E8F0" strokeWidth="1"/>
                <path d="M-13 -8 l2 2 l4 -4" stroke="#38A169" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <line x1="-15" y1="-5" x2="15" y2="-5" stroke="#E2E8F0" strokeWidth="1"/>
                <line x1="-15" y1="5" x2="15" y2="5" stroke="#E2E8F0" strokeWidth="1"/>
                <path d="M-13 12 l2 2 l4 -4" stroke="#38A169" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <line x1="-15" y1="15" x2="15" y2="15" stroke="#E2E8F0" strokeWidth="1"/>
                <path d="M -18 -35 h 36 a 3 3 0 0 1 3 3 v 7 h -42 v -7 a 3 3 0 0 1 3 -3 z" fill="#A0AEC0" />
                <path d="M -15 -34 h 30 v 8 h -30 z" fill="#718096" />
             </g>
            <path d="M60,115 C 45,120 40,100 45,95 L 60,95 C 70,95 70,115 60,115 Z" fill="#F97316" />
        </g>
    </PlatypusBaseSVG>
);

export const PlatypusWavingSimpleSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG className={className} titleId="platypus-waving-title" title="A friendly platypus waving its hand.">
        <g>
            <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
            <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
        </g>
        <g>
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="-15 80 95; 5 80 95; -15 80 95" dur="2.5s" repeatCount="indefinite" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline" />
            <path d="M78,95 C 70,80 50,90 55,105 Z" fill="#5CB88A" />
            <path d="M55,105 C 45,115 40,100 50,95 C 55,90 60,100 55,105 Z" fill="#F97316" />
        </g>
    </PlatypusBaseSVG>
);

export const PlatypusWavingSkateboardSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => {
    const [delays, setDelays] = useState({ left: '0s', right: '0s' });

    useEffect(() => {
        const randomDelay = Math.random() * 3;
        setDelays({
            left: `${randomDelay.toFixed(2)}s`,
            right: `${(randomDelay + 0.25).toFixed(2)}s`
        });
    }, []);

    return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} aria-labelledby="platypus-skateboard-title">
        <title id="platypus-skateboard-title">A friendly platypus waving its hand while riding a skateboard.</title>
        <defs>
             <style>
                {`
                @keyframes blink_skateboard {
                    0%, 95%, 100% { transform: scaleY(1); }
                    97.5% { transform: scaleY(0.1); }
                }
                .eye-group-skateboard { 
                    transform-origin: center;
                    animation-name: blink_skateboard;
                    animation-duration: 4s;
                    animation-iteration-count: infinite;
                }
                `}
            </style>
            <pattern id="tailGridSkateboard" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0,0 L 10,10 M 10,0 L 0,10" stroke="#EA580C" strokeWidth="1.5"/>
            </pattern>
        </defs>
        <g transform="translate(10, -5)">
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="#F97316"/>
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="url(#tailGridSkateboard)"/>
            <g transform="translate(105, 182) rotate(-10) scale(0.9)">
              <circle cx="-28" cy="15" r="5" fill="#FF6B6B" stroke="#C53030" strokeWidth="1" />
              <circle cx="29" cy="15" r="5" fill="#FF6B6B" stroke="#C53030" strokeWidth="1" />
              <rect x="-25" y="10" width="10" height="5" fill="#A0AEC0" rx="1"/>
              <rect x="15" y="10" width="10" height="5" fill="#A0AEC0" rx="1"/>
              <path d="M-45,0 a 10 10 0 0 1 10 -10 L 35 -10 a 10 10 0 0 1 10 10 L 45 0 a 10 10 0 0 1 -10 10 L -35 10 a 10 10 0 0 1 -10 -10 Z" fill="#D69E2E" />
              <path d="M-42,0 a 8 8 0 0 1 8 -8 L 34 -8 a 8 8 0 0 1 8 8 L 42 0 a 8 8 0 0 1 -8 8 L -34 8 a 8 8 0 0 1 -8 -8 Z" fill="#2D3748" />
              <path d="M-5 -2 C -7 3, 7 3, 5 -2 S 0, -6 0, -6 S -3, -6 -5, -2 Z" fill="#7ADAA5" opacity="0.8" />
              <circle cx="-17" cy="15" r="5" fill="#FF6B6B" stroke="#C53030" strokeWidth="1" />
              <circle cx="18" cy="15" r="5" fill="#FF6B6B" stroke="#C53030" strokeWidth="1" />
            </g>
            <path d="M80,175 C 70,190 100,190 90,175 L 90,165 L 75,168 Z" fill="#F97316" />
            <path d="M120,178 C 110,193 140,193 130,178 L 130,168 L 115,171 Z" fill="#F97316" />
            <path d="M80,70 C 70,120 70,180 85,180 L 125,180 C 140,180 140,120 130,70 Z" fill="#7ADAA5"/>
            <g>
                <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
                <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
            </g>
            <g>
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="-15 80 95; 5 80 95; -15 80 95" dur="2.5s" repeatCount="indefinite" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline" />
                <path d="M78,95 C 70,80 50,90 55,105 Z" fill="#5CB88A" />
                <path d="M55,105 C 45,115 40,100 50,95 C 55,90 60,100 55,105 Z" fill="#F97316" />
            </g>
            <path d="M80,80 C 65,65 145,65 130,80 C 140,40 70,40 80,80 Z" fill="#7ADAA5"/>
            <path d="M70,85 C 50,105 160,105 140,85 L 130,80 L 80,80 Z" fill="#F97316" />
            <g fill="#EA580C">
                <ellipse cx="98" cy="88" rx="2.5" ry="1.5" transform="rotate(-10 98 88)" />
                <ellipse cx="112" cy="88" rx="2.5" ry="1.5" transform="rotate(10 112 88)" />
            </g>
            <g className="eye-group-skateboard" style={{ animationDelay: delays.left }} transform="rotate(-10 95 68)">
                <ellipse cx="95" cy="68" rx="7" ry="11" fill="white" />
                <circle cx="97" cy="70" r="3" fill="black" />
            </g>
            <g className="eye-group-skateboard" style={{ animationDelay: delays.right }} transform="rotate(10 120 68)">
                <ellipse cx="120" cy="68" rx="7" ry="11" fill="white" />
                <circle cx="118" cy="70" r="3" fill="black" />
            </g>
        </g>
    </svg>
    );
};

export const PlatypusPeekingSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => {
    const [delays, setDelays] = useState({ left: '0s', right: '0s' });

    useEffect(() => {
        const randomDelay = Math.random() * 3;
        setDelays({
            left: `${randomDelay.toFixed(2)}s`,
            right: `${(randomDelay + 0.15).toFixed(2)}s`
        });
    }, []);

    return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="platypus-peeking-title">
      <title id="platypus-peeking-title">A curious platypus peeking from the side.</title>
        <defs>
            <style>
                {`
                @keyframes blink_peeking {
                    0%, 95%, 100% { transform: scaleY(1); }
                    97.5% { transform: scaleY(0.1); }
                }
                 @keyframes pupil_move_peeking {
                    0%, 40%, 100% { transform: translateX(0); }
                    50%, 60% { transform: translateX(2px); }
                    70%, 80% { transform: translateX(-1px); }
                }
                .eye-peeking { 
                    transform-origin: center;
                    animation-name: blink_peeking;
                    animation-duration: 5s;
                    animation-iteration-count: infinite;
                }
                .pupil-peeking { animation: pupil_move_peeking 6s infinite ease-in-out; }
                `}
            </style>
        </defs>
        <g transform="translate(50, 60) rotate(-15 100 100)">
            <path d="M130,80 C 140,40 70,40 80,80 Z" fill="#7ADAA5"/>
            <path d="M140,85 C 160,105 70,105 70,85 L 80,80 L 130,80 Z" fill="#F97316" />
            <g fill="#EA580C">
                <ellipse cx="98" cy="88" rx="2.5" ry="1.5" transform="rotate(-10 98 88)" />
                <ellipse cx="112" cy="88" rx="2.5" ry="1.5" transform="rotate(10 112 88)" />
            </g>
            <g className="eye-peeking" style={{ animationDelay: delays.left }} transform="rotate(-10 95 68)">
                <ellipse cx="95" cy="68" rx="7" ry="11" fill="white" />
                <circle cx="98" cy="70" r="3" fill="black" className="pupil-peeking"/>
            </g>
            <g className="eye-peeking" style={{ animationDelay: delays.right }} transform="rotate(10 120 68)">
                <ellipse cx="120" cy="68" rx="7" ry="11" fill="white" />
                <circle cx="123" cy="70" r="3" fill="black" className="pupil-peeking" style={{ animationDelay: '0.1s' }} />
            </g>
        </g>
    </svg>
    );
};

export const PlatypusCoinsSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <PlatypusBaseSVG 
      className={className}
      titleId="platypus-coins-title" 
      title="A cheerful platypus holding a large coin."
      defs={[
          <radialGradient key="g1" id="coinGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="80%" stopColor="#F6E05E" />
              <stop offset="100%" stopColor="#D69E2E" />
          </radialGradient>
      ]}
    >
        <g transform="translate(85, 125)">
            <circle cx="0" cy="0" r="35" fill="url(#coinGradient)" />
            <circle cx="0" cy="0" r="32" stroke="#F6E05E" strokeWidth="2" fill="none" />
            <path d="M-15 0 C -20,15 20,15 15,0 S 0,-10 0,-10 S -10,-10 -15,0 Z" fill="#EA580C" opacity="0.8" />
        </g>
        <g>
            <path d="M132,95 C 140,110 125,120 115,120 Z" fill="#5CB88A" />
            <path d="M115,120 C 125,130 140,115,125,110 L 117,118 Z" fill="#F97316" />
            <path d="M78,95 C 70,110 85,120 95,120 Z" fill="#5CB88A" />
            <path d="M95,120 C 85,130 70,115 85,110 L 93,118 Z" fill="#F97316" />
        </g>
    </PlatypusBaseSVG>
);

export const PlatypusChatHeadSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => {
    const [delays, setDelays] = useState({ left: '0s', right: '0s' });

    useEffect(() => {
        const randomDelay = Math.random() * 3;
        setDelays({
            left: `${randomDelay.toFixed(2)}s`,
            right: `${(randomDelay + 0.2).toFixed(2)}s`
        });
    }, []);

    return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="platypus-chat-title">
        <title id="platypus-chat-title">A friendly platypus mascot wearing headphones, for a chat widget.</title>
        <defs>
             <style>
                {`
                @keyframes blink_chat {
                    0%, 95%, 100% { transform: scaleY(1); }
                    97.5% { transform: scaleY(0.1); }
                }
                .eye-chat { 
                    transform-origin: center; 
                    animation-name: blink_chat;
                    animation-duration: 4s;
                    animation-iteration-count: infinite;
                }
                `}
            </style>
        </defs>
        <g transform="translate(0, 5)">
            <path d="M25 50 C 15 30, 85 30, 75 50 C 80 15, 20 15, 25 50Z" fill="#7ADAA5"/>
            <path d="M20 55 C 5 75, 95 75, 80 55 L 75 50 L 25 50 Z" fill="#F97316" />
            <g fill="#EA580C">
                <circle cx="40" cy="62" r="2" />
                <circle cx="60" cy="62" r="2" />
            </g>
            <g className="eye-chat" style={{ animationDelay: delays.left }}>
                <circle cx="40" cy="42" r="6" fill="white" />
                <circle cx="41" cy="43" r="2.5" fill="black" />
            </g>
            <g className="eye-chat" style={{ animationDelay: delays.right }}>
                <circle cx="60" cy="42" r="6" fill="white" />
                <circle cx="59" cy="43" r="2.5" fill="black" />
            </g>
            <g>
                <path d="M 20 38 C 20 10, 80 10, 80 38" strokeWidth="10" stroke="#2D3748" fill="none" strokeLinecap="round" />
                <path d="M 20 38 C 20 10, 80 10, 80 38" strokeWidth="6" stroke="#4A5568" fill="none" strokeLinecap="round" />
                <rect x="10" y="35" width="20" height="20" rx="6" fill="#2D3748"/>
                <rect x="13" y="38" width="14" height="14" rx="4" fill="#34D399"/>
                <rect x="70" y="35" width="20" height="20" rx="6" fill="#2D3748"/>
                <rect x="73" y="38" width="14" height="14" rx="4" fill="#34D399"/>
            </g>
        </g>
    </svg>
    );
};

export const PlatypusSleepingSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => {
    const [delays, setDelays] = useState({ left: '0s', right: '0s' });

    useEffect(() => {
        const randomDelay = Math.random() * 4;
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
                <stop offset="100%" stopColor="#EFF6FF" />
            </radialGradient>
            <pattern id="tailGridSleeping" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0,0 L 10,10 M 10,0 L 0,10" stroke="#EA580C" strokeWidth="1.5"/>
            </pattern>
            <style>
                {`
                    .zzz {
                        font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
                        font-weight: bold;
                        fill: #34D399;
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
            <g transform="translate(60, 60)">
                <text x="0" y="0" fontSize="16" className="zzz">z</text>
                <text x="5" y="-5" fontSize="20" className="zzz">z</text>
                <text x="10" y="-10" fontSize="24" className="zzz">Z</text>
            </g>
            <g>
                <path d="M70 120 C 40 120, 45 180, 70 180 L 140 180 C 165 180, 170 120, 140 120 Z" fill="url(#pillowGradientSleeping)" stroke="#BFDBFE" strokeWidth="0.5" />
            </g>
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="#F97316"/>
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="url(#tailGridSleeping)"/>
            <path d="M80,175 C 70,190 100,190 90,175 L 90,165 L 75,168 Z" fill="#F97316" />
            <path d="M120,178 C 110,193 140,193 130,178 L 130,168 L 115,171 Z" fill="#F97316" />
            <path d="M80,70 C 70,120 70,180 85,180 L 125,180 C 140,180 140,120 130,70 Z" fill="#7ADAA5"/>
             <g>
              <path d="M132,95 C 140,120 130,140 120,140 Z" fill="#5CB88A" />
              <path d="M120,140 C 130,150 145,135,130,130 L 122,138 Z" fill="#F97316" />
              <path d="M78,95 C 70,120 80,140 90,140 Z" fill="#5CB88A" />
              <path d="M90,140 C 80,150 65,135 80,130 L 88,138 Z" fill="#F97316" />
            </g>
            <path d="M80,80 C 65,65 145,65 130,80 C 140,40 70,40 80,80 Z" fill="#7ADAA5"/>
            <path d="M70,85 C 50,105 160,105 140,85 L 130,80 L 80,80 Z" fill="#F97316" />
            <g fill="#EA580C">
                <ellipse cx="98" cy="88" rx="2.5" ry="1.5" transform="rotate(-10 98 88)" />
                <ellipse cx="112" cy="88" rx="2.5" ry="1.5" transform="rotate(10 112 88)" />
            </g>
            <g>
                <path d="M 89 72 A 7 7 0 0 0 101 72" stroke="black" strokeWidth="1.5" fill="none" className="eye-twitch" style={{ animationDelay: delays.left }} transform="rotate(-10 95 68)" />
                <path d="M 114 72 A 7 7 0 0 0 126 72" stroke="black" strokeWidth="1.5" fill="none" className="eye-twitch" style={{ animationDelay: delays.right }} transform="rotate(10 120 68)" />
            </g>
        </g>
    </svg>
    );
};

export const WalkingPlatypusSVG: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="walking-platypus-title">
        <title id="walking-platypus-title">An animated platypus walking peacefully.</title>
        <defs>
            <style>
                {`
                @keyframes walk_blink_anim_2 { 0%, 95%, 100% { transform: scaleY(1); } 97.5% { transform: scaleY(0.1); } }
                .walk_eye_2 { transform-origin: center; animation: walk_blink_anim_2 4s infinite; }
                
                @keyframes walk_arm_anim_2 { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-10deg); } }
                .walk_arm_2 { transform-origin: 80px 95px; animation: walk_arm_anim_2 1s infinite ease-in-out; }

                @keyframes walk_leg_anim_2 { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
                .walk_leg_2 { transform-origin: 90px 170px; animation: walk_leg_anim_2 1s infinite ease-in-out; }
                
                @keyframes tail_wag_anim_2 { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
                .walk_tail_2 { transform-origin: 125px 140px; animation: tail_wag_anim_2 2s infinite ease-in-out; }
                `}
            </style>
            <pattern id="walkTailGrid2" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0,0 L 10,10 M 10,0 L 0,10" stroke="#EA580C" strokeWidth="1.5"/>
            </pattern>
        </defs>
        <g transform="translate(10, 0)">
            <g className="walk_tail_2">
                <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="#F97316"/>
                <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="url(#walkTailGrid2)"/>
            </g>
            <g className="walk_leg_2" style={{ animationDirection: 'reverse' }}>
                <path d="M120,178 C 110,193 140,193 130,178 L 130,168 L 115,171 Z" fill="#F97316" />
            </g>
            <path d="M80,70 C 70,120 70,180 85,180 L 125,180 C 140,180 140,120 130,70 Z" fill="#7ADAA5"/>
            <g className="walk_arm_2" style={{ animationDelay: '0.5s' }}>
                <path d="M78,95 C 70,80 50,90 55,105 Z" fill="#5CB88A" />
                <path d="M55,105 C 45,115 40,100 50,95 C 55,90 60,100 55,105 Z" fill="#F97316" />
            </g>
            <g className="walk_arm_2">
                <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
                <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
            </g>
             <g className="walk_leg_2">
                <path d="M80,175 C 70,190 100,190 90,175 L 90,165 L 75,168 Z" fill="#F97316" />
            </g>
            <path d="M80,80 C 65,65 145,65 130,80 C 140,40 70,40 80,80 Z" fill="#7ADAA5"/>
            <path d="M70,85 C 50,105 160,105 140,85 L 130,80 L 80,80 Z" fill="#F97316" />
            <g fill="#EA580C">
                <ellipse cx="98" cy="88" rx="2.5" ry="1.5" transform="rotate(-10 98 88)" />
                <ellipse cx="112" cy="88" rx="2.5" ry="1.5" transform="rotate(10 112 88)" />
            </g>
            <g className="walk_eye_2" style={{ animationDelay: '0.3s' }}>
                <ellipse cx="95" cy="68" rx="7" ry="11" fill="white" transform="rotate(-10 95 68)" />
                <circle cx="97" cy="70" r="3" fill="black" />
            </g>
            <g className="walk_eye_2" style={{ animationDelay: '0.5s' }}>
                <ellipse cx="120" cy="68" rx="7" ry="11" fill="white" transform="rotate(10 120 68)" />
                <circle cx="118" cy="70" r="3" fill="black" />
            </g>
        </g>
    </svg>
);

export const PlatypusExplorerSVG: React.FC<{ className?: string }> = ({ className }) => (
    <PlatypusBaseSVG
        className={className}
        titleId="platypus-explorer-title"
        title="An intrepid platypus explorer with a hat and map."
        expression="curious"
        defs={[
            <linearGradient key="lg1" id="mapGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F7EEDC"/>
                <stop offset="100%" stopColor="#F0E6CE"/>
            </linearGradient>
        ]}
        accessories={
             <g>
                <path d="M70,60 C 60,30 150,30 140,60" fill="#BF8A6B" />
                <path d="M60,60 C 40,65 170,65 150,60 L 140, 58 L 70, 58 Z" fill="#D9A384" />
             </g>
        }
    >
        <g>
            <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
            <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
        </g>
        <g>
            <path d="M78,95 C 70,80 50,90 55,105 Z" fill="#5CB88A" />
            <g transform="translate(45, 110) rotate(20)">
                <rect x="-20" y="-30" width="40" height="55" rx="3" fill="url(#mapGradient)" stroke="#A67B5B" strokeWidth="0.5" />
                <path d="M -15,-20 C 0,-15 5,-25 15,-18" stroke="#E53E3E" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
                <path d="M 0,-5 L 5,0 L 0,5 L -5,0 Z" fill="#7ADAA5"/>
            </g>
            <path d="M60,115 C 45,120 40,100 45,95 L 60,95 C 70,95 70,115 60,115 Z" fill="#F97316" />
        </g>
    </PlatypusBaseSVG>
);

export const PlatypusThumbsUpSVG: React.FC<{ className?: string }> = ({ className }) => (
    <PlatypusBaseSVG
        className={className}
        titleId="platypus-thumbs-up-title"
        title="A happy platypus giving a thumbs up."
    >
        <g>
            <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
            <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
        </g>
        <g>
            <path d="M78,95 C 70,80 50,90 55,105 Z" fill="#5CB88A" />
            <g transform="translate(55, 105) rotate(-10)">
                <path d="M0,0 C -10,5 -15,-5 -5,-10 L 10,-8 C 15,0 5,10 0,0 Z" fill="#F97316" />
                <path d="M-5,-10 C -5,-18 5,-18 5,-10" fill="#F97316" stroke="#EA580C" strokeWidth="1" />
            </g>
        </g>
    </PlatypusBaseSVG>
);