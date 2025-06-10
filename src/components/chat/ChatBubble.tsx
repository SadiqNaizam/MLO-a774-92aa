import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming Avatar is from shadcn
import { User, Bot } from 'lucide-react'; // Icons for user and AI

interface ChatBubbleProps {
  message: string | React.ReactNode; // Message can be string or rich content
  sender: 'user' | 'ai';
  timestamp?: string; // Optional timestamp
  senderName?: string; // Optional display name for sender
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp, senderName }) => {
  console.log("Rendering ChatBubble from:", sender);
  const isUser = sender === 'user';
  const bubbleClasses = cn(
    "p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-xl break-words", // Added break-words
    isUser ? "bg-blue-500 text-white self-end rounded-br-none" : "bg-gray-200 text-gray-800 self-start rounded-bl-none"
  );
  const alignmentClass = isUser ? "items-end" : "items-start";

  return (
    <div className={`flex flex-col w-full my-2 ${alignmentClass}`}>
      <div className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={isUser ? "/user-avatar.png" : "/ai-avatar.png"} alt={senderName || sender} />
          <AvatarFallback>
            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          {(senderName || timestamp) && (
            <div className={`text-xs text-gray-500 mb-1 ${isUser ? 'text-right' : 'text-left'}`}>
              {senderName && <span className="font-medium">{senderName}</span>}
              {senderName && timestamp && " · "}
              {timestamp}
            </div>
          )}
          <div className={bubbleClasses}>
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;