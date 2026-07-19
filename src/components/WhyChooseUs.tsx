import React from 'react';
import { Truck, ShieldCheck, Headphones, Undo2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WhyChooseUs: React.FC = () => {
  const features: Feature[] = [
    {
      title: 'Free & Fast Delivery',
      description: 'Enjoy complimentary express shipping on all orders over $100 worldwide.',
      icon: Truck,
    },
    {
      title: 'Encrypted Payments',
      description: 'Your transactions are fully secured with industry-leading 256-bit encryption.',
      icon: ShieldCheck,
    },
    {
      title: '24/7 Dedicated Support',
      description: 'Our customer support concierge is ready to assist you any time of day or night.',
      icon: Headphones,
    },
    {
      title: 'Hassle-Free Returns',
      description: 'Not satisfied? Return or exchange any item within 30 days of purchase.',
      icon: Undo2,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-950/90 relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-base">
            We are dedicated to providing the ultimate online shopping experience with premium perks at every step.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-100 dark:hover:border-slate-700 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 mb-6 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 dark:group-hover:text-white transition-colors duration-300"
                >
                  <Icon className="h-7 w-7" />
                </motion.div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
