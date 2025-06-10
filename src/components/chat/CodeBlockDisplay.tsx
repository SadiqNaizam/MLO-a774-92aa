import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // Assuming useToast hook exists for notifications

interface CodeBlockDisplayProps {
  code: string;
  language?: string; // For potential syntax highlighting in the future
}

const CodeBlockDisplay: React.FC<CodeBlockDisplayProps> = ({ code, language }) => {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();
  console.log("Rendering CodeBlockDisplay with language:", language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({ title: "Copied!", description: "Code copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({ title: "Error", description: "Failed to copy code.", variant: "destructive" });
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-md my-2 relative group">
      {language && (
          <div className="text-xs text-gray-400 px-4 pt-2">{language}</div>
      )}
      <pre className="p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 text-gray-400 hover:text-white opacity-50 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default CodeBlockDisplay;