import { useRef, useEffect } from 'react';
interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  isActive: boolean;
}
const AudioVisualizer = ({
  analyser,
  isActive
}: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      if (!analyser || !isActive) {
        // Draw idle state - subtle pulse
        const time = Date.now() / 1000;
        const centerY = height / 2;
        const barCount = 32;
        const barWidth = width / barCount - 2;
        for (let i = 0; i < barCount; i++) {
          const x = i * (barWidth + 2);
          const idleHeight = 4 + Math.sin(time * 2 + i * 0.3) * 2;
          ctx.fillStyle = 'hsl(var(--primary) / 0.3)';
          ctx.fillRect(x, centerY - idleHeight / 2, barWidth, idleHeight);
        }
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      const barCount = 32;
      const barWidth = width / barCount - 2;
      const centerY = height / 2;
      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2);

        // Sample from frequency data
        const dataIndex = Math.floor(i * (bufferLength / barCount));
        const value = dataArray[dataIndex];
        const barHeight = value / 255 * (height * 0.8);

        // Gradient color based on height
        const hue = 168; // Primary color hue
        const lightness = 40 + value / 255 * 20;
        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;

        // Draw symmetric bars from center
        ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser, isActive]);
  return (
    <canvas 
      ref={canvasRef} 
      width={320} 
      height={80} 
      className="w-full h-20 rounded-lg bg-black/5 dark:bg-white/5"
    />
  );
};
export default AudioVisualizer;