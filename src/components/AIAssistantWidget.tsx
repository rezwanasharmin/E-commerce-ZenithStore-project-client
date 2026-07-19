import React, { useState } from 'react';
import { Bot, X, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "👋 Hi! I am Zenith AI, your personal shopping concierge. How can I assist you today?",
    },
  ]);

  const quickPrompts = [
    '🎧 Recommend top audio gear',
    '🚚 Shipping & Return policy?',
    '🎟️ Any active discount codes?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setIsTyping(true);

    setTimeout(() => {
      let replyText = "I'm here to help! Feel free to explore our curated catalog or check out our featured products section.";

      const lower = query.toLowerCase();
      if (lower.includes('audio') || lower.includes('headphone')) {
        replyText = "✨ Our top pick for audio is the 'Fjallraven Premium Audio Wireless' with active noise cancellation. Check it out on our Home Page!";
      } else if (lower.includes('shipping') || lower.includes('return') || lower.includes('policy')) {
        replyText = "📦 We offer FREE express delivery on all orders over $100 worldwide! Returns are 100% free within 30 days of purchase.";
      } else if (lower.includes('discount') || lower.includes('code') || lower.includes('promo')) {
        replyText = "🎉 Use promo code 'ZENITH10' at checkout or in your Cart Drawer to enjoy 10% OFF your order!";
      }

      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: replyText };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 w-80 sm:w-96 overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-slate-900 dark:bg-slate-950 p-4 text-white">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center space-x-1.5">
                    <span>Zenith AI Assistant</span>
                    <Sparkles className="h-3.5 w-3.5 text-primary-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-slate-400">Online & Ready to Help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-br-none shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-2.5 rounded-2xl rounded-bl-none text-xs text-slate-400 flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 bg-primary-500 rounded-full animate-bounce" />
                    <span className="h-1.5 w-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-950 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Zenith AI anything..."
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-slate-800 transition-colors flex items-center justify-center"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-primary-600 dark:to-indigo-600 text-white shadow-2xl border border-white/20"
      >
        <div className="absolute -inset-1 rounded-full bg-primary-500/30 blur-md animate-pulse-glow" />
        {isOpen ? <X className="h-6 w-6 relative z-10" /> : <Bot className="h-6 w-6 relative z-10" />}
      </motion.button>
    </div>
  );
};
