import React from 'react';
import { Users, Truck, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Highlights: React.FC = () => {
  const metrics = [
    {
      label: 'Global Happy Clients',
      value: '50,000+',
      description: 'Satisfied buyers worldwide',
      icon: Users,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      label: 'On-Time Dispatch Rate',
      value: '99.8%',
      description: 'Guaranteed express delivery',
      icon: Truck,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      label: 'Average Customer Rating',
      value: '4.9 / 5',
      description: 'Over 12,000 verified reviews',
      icon: Star,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      label: 'Product Authenticity',
      value: '100%',
      description: 'Certified 2-year warranty',
      icon: ShieldCheck,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex items-center space-x-4 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 shadow-sm"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${metric.color} shrink-0`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {metric.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
