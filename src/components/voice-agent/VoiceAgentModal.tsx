import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, PhoneOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WaveformBars from './WaveformBars';
import { useGeminiLive } from './useGeminiLive';
import { EVE_AGENT_CONFIG } from './types';
import { toast } from 'sonner';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceAgentModal = ({ isOpen, onClose }: VoiceAgentModalProps) => {
  const hasConnectedRef = useRef(false);
  
  const { state, connect, disconnect, toggleMute, sendSuggestion } = useGeminiLive({
    systemInstruction: EVE_AGENT_CONFIG.systemInstruction,
    onError: (error) => {
      toast.error(error);
    }
  });

  const { status, isMuted, errorMessage } = state;

  // Auto-connect when modal opens (only once)
  useEffect(() => {
    if (isOpen && !hasConnectedRef.current && status === 'idle') {
      hasConnectedRef.current = true;
      connect();
    }
    
    // Reset on close
    if (!isOpen) {
      hasConnectedRef.current = false;
    }
  }, [isOpen, status, connect]);

  // Disconnect when modal closes
  const handleClose = () => {
    disconnect();
    onClose();
  };

  const handleEndCall = () => {
    disconnect();
    onClose();
  };

  const getStatusText = () => {
    switch (status) {
      case 'connecting':
        return 'מתחברת...';
      case 'listening':
        return 'מקשיבה...';
      case 'speaking':
        return 'מדברת...';
      case 'error':
        return errorMessage || 'שגיאה';
      default:
        return 'לא מחובר';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'speaking':
        return 'text-primary';
      case 'listening':
        return 'text-secondary';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
            dir="rtl"
          >
            <div className="voice-agent-modal rounded-2xl p-6 relative overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute left-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Agent info */}
              <div className="text-center mb-8">
                <div className="text-5xl mb-3">{EVE_AGENT_CONFIG.icon}</div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {EVE_AGENT_CONFIG.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {EVE_AGENT_CONFIG.role}
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex flex-col items-center mb-8">
                {status === 'connecting' ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="text-muted-foreground">{getStatusText()}</span>
                  </div>
                ) : (
                  <>
                    <WaveformBars 
                      isActive={status === 'speaking'} 
                      color={status === 'speaking' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                    />
                    <span className={`text-sm mt-2 ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 mb-8">
                {/* Mute button */}
                <Button
                  variant="outline"
                  size="lg"
                  className={`rounded-full w-14 h-14 p-0 ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : ''}`}
                  onClick={toggleMute}
                  disabled={status !== 'listening' && status !== 'speaking'}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>

                {/* End call button */}
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-full w-14 h-14 p-0"
                  onClick={handleEndCall}
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  נסו לשאול:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {EVE_AGENT_CONFIG.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => sendSuggestion(suggestion)}
                      disabled={status !== 'listening' && status !== 'speaking'}
                      className="voice-agent-suggestion px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VoiceAgentModal;
