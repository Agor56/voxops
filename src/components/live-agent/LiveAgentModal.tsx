import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import LiveAgent from './LiveAgent';

interface LiveAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveAgentModal = ({ isOpen, onClose }: LiveAgentModalProps) => {
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
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute -top-2 -left-2 z-10 p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LiveAgent */}
              <LiveAgent className="h-[500px] shadow-2xl" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveAgentModal;
