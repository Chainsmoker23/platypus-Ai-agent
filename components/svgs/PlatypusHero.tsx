
import React from 'react';

export const PlatypusHeroSVG: React.FC<{ className?: string }> = ({ className }): React.ReactElement => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="platypus-hero-title">
        <title id="platypus-hero-title">A secret agent platypus standing confidently in a cowboy hat, waving a pair of realistic, high-quality headphones.</title>
        <defs>
            <style>
                {`
                @keyframes blink_hero {
                    0%, 95%, 100% { transform: scaleY(1); }
                    97.5% { transform: scaleY(0.1); }
                }
                .eye-group-hero { 
                  transform-origin: center;
                  animation-name: blink_hero;
                  animation-duration: 4s;
                  animation-iteration-count: infinite;
                }
                `}
            </style>
            <pattern id="tailGrid" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0,0 L 10,10 M 10,0 L 0,10" stroke="#EA580C" strokeWidth="1.5"/>
            </pattern>
            <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A5568" />
                <stop offset="100%" stopColor="#2D3748" />
            </linearGradient>
            <filter id="codeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feFlood floodColor="#34D399" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
        </defs>
        <g transform="translate(10, 0)">
            {/* Tail */}
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="#F97316"/>
            <path d="M125,130 C 180,120 200,180 150,185 C 120,190 110,150 125,130 Z" fill="url(#tailGrid)"/>

            {/* Left Leg */}
            <path d="M80,175 C 70,190 100,190 90,175 L 90,165 L 75,168 Z" fill="#F97316" />
            {/* Right Leg */}
            <path d="M120,178 C 110,193 140,193 130,178 L 130,168 L 115,171 Z" fill="#F97316" />

            {/* Body */}
            <path d="M80,70 C 70,120 70,180 85,180 L 125,180 C 140,180 140,120 130,70 Z" fill="#7ADAA5"/>

            {/* Arms */}
            {/* Waving Arm with Headphones */}
            <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  values="-15 80 95; 5 80 95; -15 80 95"
                  dur="2.5s"
                  repeatCount="indefinite"
                  keyTimes="0; 0.5; 1"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  calcMode="spline"
                />
                
                {/* Arm */}
                <path d="M78,95 C 70,80 50,90 55,105 Z" fill="#5CB88A" />

                {/* Redesigned Headphones - now gripped in the middle */}
                <g transform="translate(55, 105) rotate(15) scale(0.85)">
                    {/* Headband */}
                    <path d="M -27.5 40 C -27.5 0, 27.5 0, 27.5 40" strokeWidth="12" stroke="#2D3748" fill="none" strokeLinecap="round" />
                    <path d="M -27.5 40 C -27.5 0, 27.5 0, 27.5 40" strokeWidth="8" stroke="#4A5568" fill="none" strokeLinecap="round" />

                    {/* Right Earcup (closer to viewer) */}
                    <g transform="translate(27.5, 40)">
                        <path d="M-2 -12 L -2 0 L 2 0 L 2 -12 Z" fill="#A0AEC0"/>
                        <path d="M-8 0 C -8 10, 8 10, 8 0 V -8 H -8 Z" fill="#4A5568"/>
                        <rect x="-18" y="0" width="36" height="36" rx="10" fill="#2D3748"/>
                        <rect x="-14" y="4" width="28" height="28" rx="8" fill="#4A5568"/>
                        <rect x="-10" y="8" width="20" height="20" rx="6" fill="#2D3748"/>
                        <rect x="-6" y="12" width="12" height="12" rx="4" fill="#34D399"/>
                    </g>
                    
                     {/* Left Earcup (further from viewer) */}
                    <g transform="translate(-27.5, 40)">
                        <path d="M-2 -12 L -2 0 L 2 0 L 2 -12 Z" fill="#A0AEC0"/>
                        <path d="M-8 0 C -8 10, 8 10, 8 0 V -8 H -8 Z" fill="#4A5568"/>
                        <rect x="-18" y="0" width="36" height="36" rx="10" fill="#2D3748"/>
                        <rect x="-14" y="4" width="28" height="28" rx="8" fill="#4A5568"/>
                        <rect x="-10" y="8" width="20" height="20" rx="6" fill="#2D3748"/>
                    </g>
                </g>

                {/* Hand gripping the middle of the headphones' headband */}
                <path d="M60,115 C 45,120 40,100 45,95 L 60,95 C 70,95 70,115 60,115 Z" fill="#F97316" />
            </g>
            
            {/* Static Arm (Right) */}
            <g>
                <path d="M132,95 C 145,100 148,125 138,130 Z" fill="#5CB88A" />
                <path d="M138,130 C 145,140 160,135 155,125 C 157,115 147,113 143,119 L 135,123 C 133,125 136,130 138,130 Z" fill="#F97316"/>
            </g>

            {/* Head and Bill - Refined Head Structure */}
            <path d="M80,80 C 65,65 145,65 130,80 C 140,40 70,40 80,80 Z" fill="#7ADAA5"/>
            <path d="M70,85 C 50,105 160,105 140,85 L 130,80 L 80,80 Z" fill="#F97316" />
            {/* Nostrils */}
            <g fill="#EA580C">
                <ellipse cx="98" cy="88" rx="2.5" ry="1.5" transform="rotate(-10 98 88)" />
                <ellipse cx="112" cy="88" rx="2.5" ry="1.5" transform="rotate(10 112 88)" />
            </g>

            {/* Eyes */}
            <g className="eye-group-hero" style={{ animationDelay: '0.2s' }}>
                <ellipse cx="95" cy="68" rx="7" ry="11" fill="white" transform="rotate(-10 95 68)" />
                <circle cx="97" cy="70" r="3" fill="black" />
            </g>
            <g className="eye-group-hero" style={{ animationDelay: '0.4s' }}>
                <ellipse cx="120" cy="68" rx="7" ry="11" fill="white" transform="rotate(10 120 68)" />
                <circle cx="118" cy="70" r="3" fill="black" />
            </g>
            
            {/* Cowboy Hat */}
            {/* Brim */}
            <path d="M50,55 C 30,60 180,60 160,55 C 170,45 40,45 50,55 Z" fill="url(#hatGradient)" />
            {/* Crown */}
            <path d="M75,55 C 70,25 140,25 135,55 L 75,55 Z" fill="#2D3748" />
            {/* Crown Crease */}
            <path d="M105,25 C 115,32 95,32 105,25" fill="#4A5568" />

            {/* Hat Band */}
            <rect x="74" y="50" width="62" height="6" fill="#0A2540" />

            {/* Creative Element: Glowing Code Symbol */}
            <g filter="url(#codeGlow)">
                <path d="M98 52 L 95 54.5 L 98 57" stroke="#34D399" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M112 52 L 115 54.5 L 112 57" stroke="#34D399" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
        </g>
    </svg>
);
