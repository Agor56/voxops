import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useLanguage } from '@/i18n/LanguageContext';
import { LiveAgent } from './live-agent';
import { Button } from './ui/button';

interface LiveAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const suggestions = [
  'מה זה בוטוקס?',
  'כמה עולה טיפול פילר?',
  'אפשר לקבוע תור?',
];

const LiveAgentDialog = ({ open, onOpenChange }: LiveAgentDialogProps) => {
  const { isRTL } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass-card border-border/50 p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className={`text-xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
            🎙️ דברו עם אור
          </DialogTitle>
        </DialogHeader>

        <div className="px-4">
          <LiveAgent className="h-[400px]" />
        </div>

        {/* Suggestion Chips */}
        <div className="p-4 pt-2 border-t border-border/30">
          <p className={`text-xs text-muted-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            נסו לשאול:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs rounded-full"
                onClick={() => {
                  // User can click to see the suggestion - they'll need to speak it
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveAgentDialog;
