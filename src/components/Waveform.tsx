import React from 'react';

interface WaveformProps {
  isSpeaking: boolean;
  isListening: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({ isSpeaking, isListening }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${
            isSpeaking
              ? 'bg-primary animate-waveform'
              : isListening
              ? 'bg-secondary/60 h-4'
              : 'bg-muted-foreground/30 h-2'
          }`}
          style={{
            animationDelay: isSpeaking ? `${i * 0.1}s` : undefined,
          }}
        />
      ))}
    </div>
  );
};

export default Waveform;
