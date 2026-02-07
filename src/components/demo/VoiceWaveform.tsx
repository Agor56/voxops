import { cn } from '@/lib/utils';

interface VoiceWaveformProps {
  bars?: number;
  className?: string;
  active?: boolean;
}

const VoiceWaveform = ({ bars = 7, className, active = true }: VoiceWaveformProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-1 h-8', className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-primary"
          style={{
            animation: active ? `demo-waveform 1.2s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.1}s`,
            height: active ? undefined : '4px',
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;
