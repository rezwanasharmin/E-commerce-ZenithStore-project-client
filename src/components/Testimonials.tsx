import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Jenkins',
      role: 'Creative Director',
      content: 'ZenithStore completely redefined my shopping experience. The minimal aesthetics, seamless payment flow, and lighting-fast delivery exceeded all my expectations.',
      avatarInitials: 'SJ',
      avatarBg: 'bg-indigo-100 text-indigo-700',
      rating: 5,
    },
    {
      name: 'David Miller',
      role: 'Software Architect',
      content: 'I appreciate high-quality craftsmanship, and ZenithStore delivers exactly that. The headphones I ordered are magnificent, and the AI product summary was extremely accurate.',
      avatarInitials: 'DM',
      avatarBg: 'bg-emerald-100 text-emerald-700',
      rating: 5,
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Product Designer',
      content: 'The user experience is incredibly clean and Apple-like. Checking out is absolute bliss. The support team resolved my query within minutes. Will definitely purchase again!',
      avatarInitials: 'SR',
      avatarBg: 'bg-rose-100 text-rose-700',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
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
            Customer Reviews
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-base">
            Read what our global client base has to say about their experiences shopping with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex items-center space-x-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 flex items-center space-x-4 border-t border-slate-200/60 dark:border-slate-700/60 pt-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold ${testimonial.avatarBg} shadow-sm`}
                >
                  {testimonial.avatarInitials}
                </motion.div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
