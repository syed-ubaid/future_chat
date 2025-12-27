'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', text: "Hello! I'm FutureChat. How can I help you explore the universe of code today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and typing directly
    setTimeout(() => {
      const responses = [
        "That's a fascinating perspective! Tell me more.",
        "I can certainly help with that. Here's what I found...",
        "Interesting query. Let's break it down step by step.",
        "I'm processing that information at light speed!",
        "Could you elaborate on that specific detail?",
        "Absolutely! Let's dive deeper into this topic."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: randomResponse }]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-black relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-4xl h-[85vh] glass-panel rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-slate-700/50">
        {/* Header */}
        <header className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent glow-text tracking-wide">
            FUTURE CHAT
          </h1>
          <div className="w-8" /> {/* Spacer for balance */}
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-lg leading-relaxed ${msg.role === 'user'
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-br-none'
                    : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-slate-800/80 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-700/50 flex gap-1 items-center h-[46px]">
                <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/30 backdrop-blur-md">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all text-slate-100 placeholder-slate-500 shadow-inner"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 p-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-slate-500">Powered by Next.js & TailwindCSS</span>
          </div>
        </div>
      </div>
    </main>
  );
}
