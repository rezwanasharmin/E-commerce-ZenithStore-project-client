import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Authenticity Guaranteed',
      description: 'We curate 100% verified products directly from licensed global manufacturers.',
    },
    {
      icon: Award,
      title: 'Excellence in Quality',
      description: 'Every product undergoes strict multi-stage quality assurance tests before delivery.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-First Approach',
      description: 'Dedicated 24/7 priority support to assist you with inquiries and instant hassle-free returns.',
    },
    {
      icon: Truck,
      title: 'Express Worldwide Shipping',
      description: 'Partnered with top logistics providers for rapid, tracked international shipping.',
    },
  ];

  const team = [
    {
      name: 'Sarah Jenkins',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'David Vance',
      role: 'Head of Design & Product',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Elena Rostova',
      role: 'Lead Customer Experience',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold backdrop-blur-md border border-white/20 text-primary-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Legacy & Story</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Redefining Premium E-Commerce
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              At ZenithStore, we combine cutting-edge design, sustainable sourcing, and uncompromised quality to deliver an extraordinary online shopping journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary-600 dark:text-primary-400">150K+</p>
              <p className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">45+</p>
              <p className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">Countries Served</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">99.8%</p>
              <p className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-500">24/7</p>
              <p className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Driven By Our Core Values
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Principles that guide everything we build and deliver to our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md">
                  <val.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{val.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Meet Our Leadership
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Passionate visionaries innovating the future of online retail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg text-center p-6 space-y-4"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-28 w-28 rounded-full object-cover mx-auto shadow-md border-2 border-slate-100 dark:border-slate-700"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
