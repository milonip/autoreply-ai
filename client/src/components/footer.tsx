export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded"></div>
            <span className="text-slate-600 text-sm">AutoReply.ai - Smart Message Replies</span>
          </div>
          <div className="text-sm text-slate-500">
            Powered by Groq AI
          </div>
        </div>
      </div>
    </footer>
  );
}
