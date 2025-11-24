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
  PlatypusChatHeadSVG
} from './PlatypusPlaceholders';


interface AnimatedPlatypusProps {
  mascotType: 'hero' | 'peeking' | 'magnifying' | 'rocket' | 'lollipop' | 'laptop' | 'clipboard' | 'pillow' | 'wavingSimple' | 'wavingSkateboard' | 'coins' | 'chat';
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
};

const AnimatedPlatypus: React.FC<AnimatedPlatypusProps> = ({ mascotType, className }) => {
  const MascotComponent = mascotMap[mascotType];
  const animationClass = mascotType === 'peeking' ? '' : 'animate-subtle-bob';

  return (
    <div className={`${animationClass} ${className || ''}`}>
       <MascotComponent className="w-full h-full" />
    </div>
  );
};

export default AnimatedPlatypus;