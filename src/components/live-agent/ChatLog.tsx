import { useEffect, useRef } from 'react';
import { Message } from './types';

interface ChatLogProps {
  messages: Message[];
}

const ChatLog = ({ messages }: ChatLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        השיחה תופיע כאן...
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto space-y-3 p-3"
      dir="rtl"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              message.role === 'user'
                ? 'bg-primary/20 text-foreground rounded-tr-sm'
                : 'bg-secondary/20 text-foreground rounded-tl-sm'
            }`}
          >
            <p>{message.text}</p>
            <span className="text-[10px] text-muted-foreground mt-1 block">
              {message.timestamp.toLocaleTimeString('he-IL', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLog;
