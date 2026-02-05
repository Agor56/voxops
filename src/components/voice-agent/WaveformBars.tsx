import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WaveformBarsProps {
  isActive: boolean;
  barCount?: number;
  color?: string;
}

const WaveformBars = ({ isActive, barCount = 5, color = 'hsl(var(--primary))' }: WaveformBarsProps) => {
  const [heights, setHeights] = useState<number[]>(Array(barCount).fill(0.3));

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(barCount).fill(0.3));
      return;
    }

    const interval = setInterval(() => {
      setHeights(prev => 
        prev.map(() => 0.3 + Math.random() * 0.7)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {heights.map((height, index) => (
        <motion.div
          key={index}
          className="waveform-bar"
          style={{ backgroundColor: color }}
          animate={{
            scaleY: height,
            opacity: isActive ? 1 : 0.5
          }}
          transition={{
            duration: 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default WaveformBars;
