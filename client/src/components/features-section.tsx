import { Zap, MessageSquare, Copy } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 text-brand-blue" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Lightning Fast</h3>
        <p className="text-sm text-slate-600">Generate multiple reply options in seconds using advanced AI technology</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Multiple Tones</h3>
        <p className="text-sm text-slate-600">Choose from friendly, professional, empathetic, or blunt communication styles</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Copy className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Easy Copy</h3>
        <p className="text-sm text-slate-600">One-click copying to use your perfect reply anywhere you need it</p>
      </div>
    </div>
  );
}
