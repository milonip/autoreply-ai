import { useState } from "react";
import { useToast } from "./use-toast";

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      toast({
        title: "Copied to clipboard!",
        description: "Reply text has been copied to your clipboard.",
        duration: 2000,
      });

      // Reset after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return { copyToClipboard, isCopied };
}
