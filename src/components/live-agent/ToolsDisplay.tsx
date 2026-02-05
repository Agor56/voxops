import { ToolCallLog } from './types';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface ToolsDisplayProps {
  logs: ToolCallLog[];
}

const ToolsDisplay = ({ logs }: ToolsDisplayProps) => {
  if (logs.length === 0) {
    return null;
  }

  const getIcon = (name: string) => {
    switch (name) {
      case 'checkAvailability':
        return <Clock className="w-4 h-4 text-primary" />;
      case 'bookAppointment':
        return <Calendar className="w-4 h-4 text-secondary" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="border-t border-border/50 p-3 space-y-2" dir="rtl">
      <p className="text-xs text-muted-foreground font-medium">פעולות אחרונות:</p>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {logs.slice(-3).map((log, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-xs bg-muted/30 rounded-lg p-2"
          >
            {getIcon(log.name)}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">
                {log.name === 'checkAvailability' ? 'בדיקת זמינות' : 'קביעת תור'}
              </p>
              {log.name === 'checkAvailability' && log.args?.specialty && (
                <p className="text-muted-foreground truncate">
                  התמחות: {log.args.specialty}
                </p>
              )}
              {log.name === 'bookAppointment' && log.args?.time && (
                <p className="text-muted-foreground truncate">
                  שעה: {log.args.time}
                </p>
              )}
              {log.result && (
                <p className="text-primary/80 truncate">
                  {typeof log.result === 'string' ? log.result : JSON.stringify(log.result).slice(0, 50)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsDisplay;
