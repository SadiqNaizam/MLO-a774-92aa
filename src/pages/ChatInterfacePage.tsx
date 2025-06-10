import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/chat/Sidebar';
import ConversationHistoryItem from '@/components/chat/ConversationHistoryItem';
import ChatBubble from '@/components/chat/ChatBubble';
import CodeBlockDisplay from '@/components/chat/CodeBlockDisplay';
import MessageInputArea from '@/components/chat/MessageInputArea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User, Settings, LogOut, Sun, Moon } from 'lucide-react'; // Added Sun/Moon for theme toggle example

// Placeholder types
interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'user' | 'ai';
  timestamp: string;
  senderName?: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessagePreview: string;
  timestamp: string;
}

const ChatInterfacePage = () => {
  const [currentConversationId, setCurrentConversationId] = useState<string | null>('conv1');
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 'conv1', title: 'Quantum Computing Explained', lastMessagePreview: 'AI: Sure, quantum computing uses q-bits...', timestamp: '10:30 AM' },
    { id: 'conv2', title: 'Recipe Ideas', lastMessagePreview: 'User: Any ideas for a vegan dinner?', timestamp: 'Yesterday' },
    { id: 'conv3', title: 'Project Brainstorm', lastMessagePreview: 'AI: We could integrate a new API for...', timestamp: 'Mon' },
  ]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'msg1', sender: 'user', text: 'Explain quantum computing in simple terms', timestamp: '10:25 AM', senderName: 'User' },
    { 
      id: 'msg2', 
      sender: 'ai', 
      text: (
        <div>
          <p>Sure, quantum computing uses q-bits, which can be 0, 1, or both at the same time (superposition)!</p>
          <CodeBlockDisplay 
            language="python"
            code={`def greet(name):\n  print(f"Hello, {name}!")`} 
          />
        </div>
      ), 
      timestamp: '10:26 AM', 
      senderName: 'AI Assistant' 
    },
    { id: 'msg3', sender: 'user', text: 'What are q-bits?', timestamp: '10:28 AM', senderName: 'User' },
    { id: 'msg4', sender: 'ai', text: 'Q-bits are the fundamental unit of quantum information, analogous to bits in classical computing.', timestamp: '10:29 AM', senderName: 'AI Assistant'},
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Example theme state

  useEffect(() => {
    console.log('ChatInterfacePage loaded');
    // Load messages for currentConversationId or welcome message
  }, [currentConversationId]);
  
  const handleSelectConversation = (id: string) => {
    console.log('Selected conversation:', id);
    setCurrentConversationId(id);
    // Fetch/filter messages for this conversation
  };

  const handleNewChat = () => {
    console.log('New chat started');
    const newConvId = `conv${conversations.length + 1}`;
    setConversations(prev => [{id: newConvId, title: 'New Chat', lastMessagePreview: '', timestamp: new Date().toLocaleTimeString()}, ...prev]);
    setCurrentConversationId(newConvId);
    setMessages([]);
  };

  const handleSendMessage = (messageText: string) => {
    console.log('Sending message:', messageText);
    const userMessage: Message = {
      id: `msg${messages.length + 1}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: 'User'
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg${messages.length + 2}`,
        text: `AI response to: "${messageText}"`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderName: 'AI Assistant'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleDeleteConversation = (id: string) => {
    console.log('Deleting conversation:', id);
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(conversations.length > 1 ? conversations.filter(c => c.id !== id)[0].id : null);
      setMessages([]);
    }
  };

  const toggleTheme = () => setIsDarkTheme(prev => !prev);


  return (
    <TooltipProvider>
      <div className={`flex h-screen antialiased text-gray-800 ${isDarkTheme ? 'dark bg-slate-900 text-slate-50' : 'bg-white text-gray-800'}`}>
        <Sidebar onNewChat={handleNewChat} title="My Conversations">
          {conversations.map(conv => (
            <ConversationHistoryItem
              key={conv.id}
              id={conv.id}
              title={conv.title}
              lastMessagePreview={conv.lastMessagePreview}
              timestamp={conv.timestamp}
              isActive={conv.id === currentConversationId}
              onClick={handleSelectConversation}
              onDelete={handleDeleteConversation}
            />
          ))}
          <div className="mt-auto border-t pt-4 space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
              </TooltipTrigger>
              <TooltipContent>View your profile</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('Navigate to settings')}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open application settings</TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme}>
                    {isDarkTheme ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </TooltipTrigger>
              <TooltipContent>Log out</TooltipContent>
            </Tooltip>
          </div>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className={`p-4 border-b ${isDarkTheme ? 'border-slate-700' : 'border-gray-200'}`}>
            <h1 className="text-xl font-semibold">
              {currentConversationId ? conversations.find(c => c.id === currentConversationId)?.title : 'Chat'}
            </h1>
          </header>
          
          <ScrollArea className="flex-grow p-4 space-y-4">
            {messages.map(msg => (
              <ChatBubble
                key={msg.id}
                message={msg.text}
                sender={msg.sender}
                timestamp={msg.timestamp}
                senderName={msg.senderName}
              />
            ))}
          </ScrollArea>

          <MessageInputArea
            onSendMessage={handleSendMessage}
            placeholder="Type your message here..."
          />
        </main>
      </div>
    </TooltipProvider>
  );
};

export default ChatInterfacePage;