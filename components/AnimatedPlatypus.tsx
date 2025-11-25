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
  PlatypusSleepingSVG,
  PlatypusExplorerSVG,
  PlatypusThumbsUpSVG
} from './PlatypusPlaceholders';

type MascotType = 'hero' | 'peeking' | 'magnifying' | 'rocket' | 'lollipop' | 'laptop' | 'clipboard' | 'pillow' | 'wavingSimple' | 'wavingSkateboard' | 'coins' | 'chat' | 'sleeping' | 'explorer' | 'thumbsUp';

interface AnimatedPlatypusProps {
  mascotType: MascotType;
  className?: string;
}

const mascotMap: Record<MascotType, React.FC<{className: string}>> = {
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
  explorer: PlatypusExplorerSVG,
  thumbsUp: PlatypusThumbsUpSVG,
};

const AnimatedPlatypus: React.FC<AnimatedPlatypusProps> = ({ mascotType, className }): React.ReactElement | null => {
  const MascotComponent = mascotMap[mascotType];
  
  if (!MascotComponent) {
    console.warn(`Invalid mascotType provided: ${mascotType}`);
    return null;
  }

  const animationClass = (mascotType === 'peeking' || mascotType === 'sleeping') ? '' : 'animate-subtle-bob';

  return (
    <div className={`${animationClass} ${className || ''}`}>
       <MascotComponent className="w-full h-full" />
    </div>
  );
};

export default AnimatedPlatypus;