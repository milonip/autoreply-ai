import { MessageSquare } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">AutoReply.ai</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Smart Message Replies</span>
          </div>
        </div>
      </div>
    </header>
  );
}
