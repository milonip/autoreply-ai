import { MessageSquare, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { Reply } from "@shared/schema";

interface ReplyOutputProps {
  replies: Reply[];
  isLoading: boolean;
}

export function ReplyOutput({ replies, isLoading }: ReplyOutputProps) {
  const { copyToClipboard } = useCopyToClipboard();

  const getToneColor = (tone: string) => {
    switch (tone) {
      case "friendly":
        return "text-brand-blue bg-blue-50";
      case "professional":
        return "text-green-600 bg-green-50";
      case "empathetic":
        return "text-purple-600 bg-purple-50";
      case "blunt":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const getToneLabel = (tone: string) => {
    switch (tone) {
      case "friendly":
        return "😊 Friendly";
      case "professional":
        return "💼 Professional";
      case "empathetic":
        return "🤝 Empathetic";
      case "blunt":
        return "⚡ Blunt";
      default:
        return tone;
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Generated Replies</CardTitle>
        <p className="text-sm text-slate-600">AI-powered suggestions tailored to your selected tone</p>
      </CardHeader>
      <CardContent>
        {!replies.length && !isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-slate-900 font-medium mb-2">No replies generated yet</h4>
            <p className="text-sm text-slate-500">Enter a message and click "Generate Smart Replies" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {replies.map((reply, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getToneColor(reply.tone)}`}>
                    {getToneLabel(reply.tone)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(reply.text)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 h-auto"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{reply.text}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
