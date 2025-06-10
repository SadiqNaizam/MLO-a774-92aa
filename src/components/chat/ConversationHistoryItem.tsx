import React from 'react';
import { cn } from '@/lib/utils'; // For conditional class names
import { MessageSquare, Trash2 } from 'lucide-react'; // Example icons

interface ConversationHistoryItemProps {
  id: string;
  title: string;
  lastMessagePreview?: string;
  timestamp?: string;
  isActive: boolean;
  onClick: (id: string) => void;
  onDelete?: (id: string) => void; // Optional delete action
}

const ConversationHistoryItem: React.FC<ConversationHistoryItemProps> = ({
  id,
  title,
  lastMessagePreview,
  timestamp,
  isActive,
  onClick,
  onDelete,
}) => {
  console.log("Rendering ConversationHistoryItem:", title, "Active:", isActive);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onClick from firing
    onDelete?.(id);
    console.log("Delete conversation:", id);
  };

  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group",
        isActive ? "bg-gray-200 font-semibold" : "bg-transparent"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(id)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 overflow-hidden">
            <MessageSquare className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <p className="text-sm truncate" title={title}>{title}</p>
        </div>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={`Delete conversation: ${title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      {lastMessagePreview && (
        <p className="text-xs text-gray-500 mt-1 truncate" title={lastMessagePreview}>
          {lastMessagePreview}
        </p>
      )}
      {timestamp && (
        <p className="text-xs text-gray-400 mt-0.5 text-right">{timestamp}</p>
      )}
    </div>
  );
}

export default ConversationHistoryItem;