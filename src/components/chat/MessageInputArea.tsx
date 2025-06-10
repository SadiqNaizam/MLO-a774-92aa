import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
// Potentially import other UI elements like a Paperclip for attachments

interface MessageInputAreaProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInputArea: React.FC<MessageInputAreaProps> = ({
  onSendMessage,
  placeholder = "Type your message...",
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  console.log("Rendering MessageInputArea, disabled:", disabled);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-2 p-4 border-t bg-white">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-grow resize-none min-h-[40px]" // Ensure it doesn't shrink too small
        rows={1} // Start with one row, will expand
        disabled={disabled}
        aria-label="Chat message input"
      />
      <Button type="submit" disabled={disabled || !message.trim()} aria-label="Send message">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

export default MessageInputArea;