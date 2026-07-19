import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide an email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-900 border-t border-slate-800 text-white overflow-hidden relative">
      {/* Animated Decorative glowing background blobs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.25, 1, 1.25],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 rounded-full bg-slate-800 border border-slate-700/80 px-4 py-1.5 text-xs font-semibold text-primary-400 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary-400 animate-pulse" />
            <span>Join Our Exclusive Circle</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            Stay ahead of the curve. Join our newsletter to receive curated updates, private sales, and exclusive collection releases.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-md mx-auto"
        >
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-8 bg-slate-800/80 border border-slate-700/80 backdrop-blur-md rounded-2xl shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-12 w-12 text-accent-emerald mb-3" />
              </motion.div>
              <h3 className="text-lg font-bold">Successfully Subscribed!</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Thank you for joining us. Check your inbox soon for your exclusive welcome gift.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="flex items-center justify-center space-x-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition-all"
                >
                  <span>Subscribe</span>
                  <Send className="h-4 w-4 shrink-0" />
                </motion.button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-left text-xs font-medium text-rose-400 pl-1"
                >
                  {error}
                </motion.p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

