
import React, { useState, useEffect, useRef } from 'react';
import { PlatypusBoatSVG } from './PlatypusPlaceholders';

const nauticalThoughts = [
  "git commit -m 'set sail'",
  "docker run skiff",
  "deploying to the data stream",
  "while(true) { navigate() }",
  "// TODO: Catch more bugs",
  "k8s pod launched",
  "npm install sonar"
];

const actionThoughts = [
  "Full speed ahead!",
  "Hold fast!",
  "Adjusting course..."
];

const ForestWalkSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [thought, setThought] = useState("");
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; duration: number; delay: number; size: number }[]>([]);

    useEffect(() => {
        setParticles(Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: 50 + Math.random() * 50, // Start from the lower half
            duration: 4 + Math.random() * 6,
            delay: Math.random() * 10,
            size: 1 + Math.random() * 2,
        })));
    }, []);

    // Thought Bubble Logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (isInteracting) return; 
            const randomThought = nauticalThoughts[Math.floor(Math.random() * nauticalThoughts.length)];
            setThought(randomThought);
            setIsBubbleVisible(true);
            setTimeout(() => setIsBubbleVisible(false), 3500); 
        }, 7000); 

        return () => clearInterval(interval);
    }, [isInteracting]);

    const handleInteraction = () => {
        if (isInteracting) return;
        setIsInteracting(true);
        const randomAction = actionThoughts[Math.floor(Math.random() * actionThoughts.length)];
        setThought(randomAction);
        setIsBubbleVisible(true);

        setTimeout(() => {
            setIsInteracting(false);
            setTimeout(() => setIsBubbleVisible(false), 2000);
        }, 1000);
    };

    return (
        <section 
            ref={sectionRef}
            onClick={handleInteraction}
            className="relative w-full aspect-[16/9] max-h-[500px] min-h-[300px] overflow-hidden rounded-2xl shadow-xl transition-colors duration-1000 bg-gradient-to-b from-sky-300 via-sky-200 to-blue-400 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 cursor-pointer group select-none"
            role="img"
            aria-label="An interactive ocean scene with a platypus captain in a magical skiff. Click to interact!"
        >
            <style>{`
                @keyframes boat-bob-complex {
                    0% { transform: translateY(0) rotate(1deg); }
                    25% { transform: translateY(-4px) rotate(-1deg); }
                    50% { transform: translateY(2px) rotate(0.5deg); }
                    100% { transform: translateY(0) rotate(1deg); }
                }
                .animate-boat-bob-complex { animation: boat-bob-complex 4s ease-in-out infinite; }
                
                @keyframes spindrift-float {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    20% { opacity: 0.8; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
                }
            `}</style>
            
            {/* --- RESPONSIVE SVG CONTAINER --- */}
            <svg viewBox="0 0 1000 562.5" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full pointer-events-none">
                
                {/* Sky & Sun/Moon */}
                <rect width="1000" height="350" className="fill-sky-300 dark:fill-slate-900 transition-colors duration-1000" />
                <circle cx="850" cy="100" r="50" className="fill-yellow-300 blur-2xl opacity-60 dark:opacity-0 transition-opacity duration-1000" />
                <circle cx="850" cy="100" r="40" className="fill-slate-100 blur-xl opacity-0 dark:opacity-30 transition-opacity duration-1000" />

                {/* --- SEAMLESS MORPHING WAVES --- */}
                {/* Wave 3 (Furthest) */}
                <path className="fill-blue-800/40 dark:fill-indigo-950/40" transform="translate(0 20)">
                    <animate attributeName="d" dur="15s" repeatCount="indefinite" values="M0,280 C300,230 700,330 1000,280 L1000,563 L0,563 Z; M0,280 C300,330 700,230 1000,280 L1000,563 L0,563 Z; M0,280 C300,230 700,330 1000,280 L1000,563 L0,563 Z;" />
                </path>
                {/* Wave 2 */}
                <path className="fill-blue-700/60 dark:fill-indigo-900/60" transform="translate(0 10)">
                     <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0,300 C400,360 600,260 1000,300 L1000,563 L0,563 Z; M0,300 C400,260 600,360 1000,300 L1000,563 L0,563 Z; M0,300 C400,360 600,260 1000,300 L1000,563 L0,563 Z;" />
                </path>

                {/* --- Magical Spindrift Particle Effect --- */}
                <g>
                    {particles.map(p => (
                        <circle 
                            key={p.id}
                            cx={`${p.x}%`} 
                            cy={`${p.y}%`} 
                            r={p.size}
                            className="fill-white/50 dark:fill-purple-300/50"
                            style={{ 
                                animation: `spindrift-float ${p.duration}s ease-out infinite`,
                                animationDelay: `${p.delay}s`
                            }}
                        />
                    ))}
                </g>

                {/* --- BOAT --- (Placed within SVG for responsive scaling & layering) */}
                <foreignObject x="350" y="220" width="300" height="300" className="pointer-events-auto">
                     <div className="relative w-full h-full animate-boat-bob-complex">
                        {/* Thought Bubble */}
                        <div className={`absolute -top-16 -left-10 transition-all duration-300 transform ${isBubbleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                            <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-xs font-mono whitespace-nowrap">
                                <span dangerouslySetInnerHTML={{ __html: thought }} />
                                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white dark:bg-gray-800 border-b border-l border-gray-200 dark:border-gray-700 transform rotate-45 skew-x-12"></div>
                            </div>
                        </div>
                        {/* Platypus Boat */}
                        <div className="transition-transform origin-bottom">
                            <PlatypusBoatSVG className="w-full h-auto drop-shadow-2xl" isInteracting={isInteracting} />
                        </div>
                    </div>
                </foreignObject>

                {/* Wave 1 (Closest / Foam) - Low profile to prevent occlusion */}
                <path className="fill-blue-600/80 dark:fill-indigo-800/80">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,420 C350,390 650,450 1000,420 L1000,563 L0,563 Z; M0,420 C350,450 650,390 1000,420 L1000,563 L0,563 Z; M0,420 C350,390 650,450 1000,420 L1000,563 L0,563 Z;" />
                </path>
                 <path className="fill-white/30 dark:fill-white/20 opacity-50">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,420 C350,390 650,450 1000,420 L1000,425 C650,455 350,395 0,425 Z; M0,420 C350,450 650,390 1000,420 L1000,425 C650,395 350,455 0,425 Z; M0,420 C350,390 650,450 1000,420 L1000,425 C650,455 350,395 0,425 Z;" />
                </path>
            </svg>

            {/* Click Hint */}
            <div className="absolute bottom-4 right-4 z-50 animate-fade-in-subtle text-xs text-white/70 bg-black/20 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                Click to interact!
            </div>
        </section>
    );
};

export default ForestWalkSection;
