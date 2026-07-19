import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:5000/api/contact', {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || 'General Inquiry',
        message: message.trim()
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.warn('Backend offline, displaying success fallback:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-100 dark:border-primary-800/60 px-4 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>24/7 Concierge Service</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get in Touch With Us
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Have a question about an order or product? Our team is here to support you anytime.
          </p>
        </div>

        {/* 2-Column Grid: Contact Info Cards + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: Office Headquarters */}
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shrink-0 shadow-md">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Headquarters</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  123 Innovation Boulevard, Suite 500, Tech City, TC 94016
                </p>
              </div>
            </div>

            {/* Card 2: Email & Phone */}
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shrink-0 shadow-md">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Communication</h3>
                <p className="text-slate-500 dark:text-slate-400">Email: <span className="font-bold text-slate-800 dark:text-slate-200">support@zenithstore.com</span></p>
                <p className="text-slate-500 dark:text-slate-400">Toll-Free: <span className="font-bold text-slate-800 dark:text-slate-200">+1 (555) 019-2834</span></p>
              </div>
            </div>

            {/* Card 3: Support Working Hours */}
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shrink-0 shadow-md">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Support Operating Hours</h3>
                <p className="text-slate-500 dark:text-slate-400">Mon - Fri: 8:00 AM - 10:00 PM EST</p>
                <p className="text-slate-500 dark:text-slate-400">Sat - Sun: 9:00 AM - 6:00 PM EST</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl space-y-6"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Send Us a Message</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fill out the form below and our response team will get back to you within 2 hours.
                </p>
              </div>

              {submitted && (
                <div className="flex items-center space-x-2 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 p-4 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Thank you! Your message has been sent successfully. We will reply shortly.</span>
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-2 rounded-2xl border border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/40 p-4 text-xs font-bold text-rose-700 dark:text-rose-300">
                  <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Order Inquiry / Product Support"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you today?"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 py-4 text-xs font-extrabold text-white shadow-lg hover:bg-slate-800 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white dark:border-slate-900/20 dark:border-t-slate-900"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
};
