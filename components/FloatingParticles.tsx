
import React, { useEffect, useState } from 'react';

const symbols = ['{ }', '</>', 'fn', '=>', ';', '#', '&&', '||', '[]', '()', 'div', 'import', 'const', 'return', 'class', 'void'];

interface Particle {
  id: number;
  left: number;
  symbol: string;
  duration: number;
  delay: number;
  size: number;
}

const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client side to ensure random consistency
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100%
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      duration: 15 + Math.random() * 20, // 15-35s duration
      delay: -Math.random() * 30, // Negative delay to start mid-animation
      size: 10 + Math.random() * 20, // 10-30px font size
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-platypus-primary/5 dark:text-platypus-primary/10 font-mono font-bold select-none animate-float-up"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            bottom: '-50px', // Start slightly below screen
            willChange: 'transform, opacity',
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
