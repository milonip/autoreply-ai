import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Loader2 } from "lucide-react";

interface MessageInputProps {
  onGenerateReplies: (message: string, tone: string, provider: string) => void;
  isLoading: boolean;
}

export function MessageInput({ onGenerateReplies, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("friendly");
  const [provider, setProvider] = useState("groq");

  // Load saved tone preference
  useEffect(() => {
    const savedTone = localStorage.getItem("preferredTone");
    if (savedTone && ["friendly", "professional", "empathetic", "blunt"].includes(savedTone)) {
      setTone(savedTone);
    }
  }, []);

  // Save tone preference
  useEffect(() => {
    localStorage.setItem("preferredTone", tone);
  }, [tone]);

  const handleGenerate = () => {
    if (!message.trim()) {
      return;
    }
    onGenerateReplies(message.trim(), tone, provider);
  };

  const handleClear = () => {
    setMessage("");
  };

  const characterCount = message.length;

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Received Message</CardTitle>
        <p className="text-sm text-slate-600">Paste the message you received and want to reply to</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="message-input" className="block text-sm font-medium text-slate-700 mb-2">
            Message Content
          </Label>
          <Textarea
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hey! I wanted to follow up on our meeting yesterday. Could we schedule a time to discuss the project timeline? I'm available most afternoons this week. Let me know what works for you!"
            className="w-full h-32 resize-none text-sm"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500">{characterCount} characters</span>
            <Button variant="ghost" size="sm" onClick={handleClear} className="text-xs text-brand-blue hover:text-brand-blue-dark">
              Clear
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tone-select" className="block text-sm font-medium text-slate-700 mb-2">
              Reply Tone
            </Label>
            <Select value={tone} onValueChange={setTone} disabled={isLoading}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">😊 Friendly</SelectItem>
                <SelectItem value="professional">💼 Professional</SelectItem>
                <SelectItem value="empathetic">🤝 Empathetic</SelectItem>
                <SelectItem value="blunt">⚡ Blunt</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="provider-select" className="block text-sm font-medium text-slate-700 mb-2">
              AI Provider
            </Label>
            <Select value={provider} onValueChange={setProvider} disabled={isLoading}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groq">🚀 Groq (Free & Fast)</SelectItem>
                <SelectItem value="openai">🧠 OpenAI (Premium)</SelectItem>
                <SelectItem value="demo">💡 Demo Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!message.trim() || isLoading}
          className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-3 px-4 rounded-lg font-medium hover:from-brand-blue-dark hover:to-blue-800 focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Generate Smart Replies
            </>
          )}
        </Button>

        {isLoading && (
          <div className="flex items-center justify-center space-x-2 text-slate-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Generating replies...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
