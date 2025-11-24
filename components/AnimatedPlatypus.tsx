import React from 'react';
import { 
  PlatypusHeroSVG, 
  PlatypusPeekingSVG, 
  PlatypusMagnifyingGlassSVG, 
  PlatypusRocketSVG,
  PlatypusLollipopSVG,
  PlatypusLaptopSVG,
  PlatypusClipboardSVG,
  PlatypusPillowSVG,
  PlatypusWavingSimpleSVG,
  PlatypusWavingSkateboardSVG,
  PlatypusCoinsSVG,
  PlatypusChatHeadSVG,
  PlatypusSleepingSVG
} from './PlatypusPlaceholders';


interface AnimatedPlatypusProps {
  mascotType: 'hero' | 'peeking' | 'magnifying' | 'rocket' | 'lollipop' | 'laptop' | 'clipboard' | 'pillow' | 'wavingSimple' | 'wavingSkateboard' | 'coins' | 'chat' | 'sleeping';
  className?: string;
}

const mascotMap = {
  hero: PlatypusHeroSVG,
  peeking: PlatypusPeekingSVG,
  magnifying: PlatypusMagnifyingGlassSVG,
  rocket: PlatypusRocketSVG,
  lollipop: PlatypusLollipopSVG,
  laptop: PlatypusLaptopSVG,
  clipboard: PlatypusClipboardSVG,
  pillow: PlatypusPillowSVG,
  wavingSimple: PlatypusWavingSimpleSVG,
  wavingSkateboard: PlatypusWavingSkateboardSVG,
  coins: PlatypusCoinsSVG,
  chat: PlatypusChatHeadSVG,
  sleeping: PlatypusSleepingSVG,
};

const AnimatedPlatypus: React.FC<AnimatedPlatypusProps> = ({ mascotType, className }) => {
  console.log(`Rendering: AnimatedPlatypus (type: ${mascotType})`);
  const MascotComponent = mascotMap[mascotType];
  if (!MascotComponent) return null; // Safety check

  const animationClass = (mascotType === 'peeking' || mascotType === 'sleeping') ? '' : 'animate-subtle-bob';

  return (
    <div className={`${animationClass} ${className || ''}`}>
       <MascotComponent className="w-full h-full" />
    </div>
  );
};

export default AnimatedPlatypus;