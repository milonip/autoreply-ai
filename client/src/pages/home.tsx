import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { MessageInput } from "@/components/message-input";
import { ReplyOutput } from "@/components/reply-output";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { replyApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Reply } from "@shared/schema";

export default function Home() {
  const [replies, setReplies] = useState<Reply[]>([]);
  const { toast } = useToast();

  const generateRepliesMutation = useMutation({
    mutationFn: replyApi.generateReplies,
    onSuccess: (data) => {
      setReplies(data.replies);
      toast({
        title: "Replies generated!",
        description: `Generated ${data.replies.length} reply suggestions.`,
      });
    },
    onError: (error: Error) => {
      console.error("Error generating replies:", error);
      setReplies([]);
      
      let errorMessage = "Failed to generate replies. Please try again.";
      
      if (error.message.includes("API key")) {
        errorMessage = "OpenAI API key not configured. Please check your settings.";
      } else if (error.message.includes("quota") || error.message.includes("billing")) {
        errorMessage = "OpenAI API quota exceeded. Please check your billing settings.";
      } else if (error.message.includes("Invalid request data")) {
        errorMessage = "Please check your message and try again.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const handleGenerateReplies = (message: string, tone: string) => {
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message to generate replies.",
        variant: "destructive",
      });
      return;
    }

    generateRepliesMutation.mutate({
      message: message.trim(),
      tone: tone as "friendly" | "professional" | "empathetic" | "blunt",
    });
  };

  return (
    <div className="bg-slate-50 font-inter min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Generate Smart Replies Instantly</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Paste any message and get AI-powered reply suggestions in different tones. Perfect for emails, DMs, and professional communications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <MessageInput
            onGenerateReplies={handleGenerateReplies}
            isLoading={generateRepliesMutation.isPending}
          />
          <ReplyOutput
            replies={replies}
            isLoading={generateRepliesMutation.isPending}
          />
        </div>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
