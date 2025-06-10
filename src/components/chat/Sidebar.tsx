import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle } from 'lucide-react';

// Define props for the Sidebar, e.g., conversation history items
// For now, it will render children, which can be ConversationHistoryItem components
interface SidebarProps {
  children: React.ReactNode;
  onNewChat?: () => void;
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, onNewChat, title = "Conversations" }) => {
  console.log("Rendering Sidebar");

  return (
    <aside className="w-64 md:w-72 h-full bg-gray-50 border-r border-gray-200 flex flex-col p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onNewChat && (
          <Button variant="ghost" size="icon" onClick={onNewChat} aria-label="New Chat">
            <PlusCircle className="h-5 w-5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-grow pr-2">
        <div className="space-y-2">
          {children}
        </div>
      </ScrollArea>
      {/* Optional: Footer section for user avatar, settings link */}
      {/* <div className="mt-auto border-t pt-4"> User Profile / Settings link </div> */}
    </aside>
  );
}

export default Sidebar;