import { useMemo } from 'react';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

const HeroParticles = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            background: particle.id % 3 === 0 
              ? 'hsl(24 92% 52%)' 
              : particle.id % 3 === 1 
                ? 'hsl(210 100% 60%)' 
                : 'hsl(0 0% 70%)',
            boxShadow: particle.id % 3 === 0 
              ? '0 0 8px hsl(24 92% 52% / 0.6)' 
              : particle.id % 3 === 1 
                ? '0 0 8px hsl(210 100% 60% / 0.6)' 
                : '0 0 6px hsl(0 0% 70% / 0.4)',
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default HeroParticles;
