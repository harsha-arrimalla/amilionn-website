import { motion } from 'framer-motion';
import { useInView, useCountUp } from '../hooks';
import { STATS } from '../data/content';
import { TrendingUp, Briefcase, MapPin, Users } from 'lucide-react';

const ICONS = [TrendingUp, Briefcase, MapPin, Users];

function AnimatedStat({ stat, index, isInView }) {
  const numericMatch = stat.value.replace(/,/g, '').match(/\d+/);
  const numericVal = numericMatch ? parseInt(numericMatch[0]) : 0;
  const count = useCountUp(numericVal, 2400, isInView);
  const formatted = count.toLocaleString();
  const Icon = ICONS[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="relative z-10 text-center px-6 py-10 lg:py-14">
        <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center mx-auto mb-6 group-hover:bg-white/[0.12] group-hover:border-white/[0.15] transition-all duration-500">
          <Icon className="w-5 h-5 text-primary-300" />
        </div>

        <div className="mb-3 whitespace-nowrap">
          <span className="font-mono font-bold text-white text-[3rem] sm:text-[3.5rem] lg:text-[4rem] tracking-tighter leading-none">
            {stat.prefix || ''}
            {formatted}
          </span>
          <span className="font-mono font-bold text-primary-300 text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] tracking-tighter">
            {stat.suffix || ''}
          </span>
        </div>

        <p className="font-heading font-semibold text-white/90 text-[15px] mb-2 tracking-tight">
          {stat.label}
        </p>

        <p className="text-primary-200/50 text-[13px] leading-relaxed max-w-[240px] mx-auto">
          {stat.description}
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8 + index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-10 h-[2px] bg-gradient-to-r from-primary-400 to-primary-300 rounded-full mx-auto mt-6 origin-left"
        />
      </div>

      {index < 3 && (
        <div className="hidden lg:block absolute right-0 top-[15%] bottom-[15%] w-px bg-white/[0.07]" />
      )}
    </motion.div>
  );
}

export default function Stats() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-400/8 rounded-full blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
        {/* Header — staggered text animations */}
        <div className="text-center mb-6">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-primary-300 text-[12px] font-bold uppercase tracking-[0.2em] mb-3 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full backdrop-blur-sm"
          >
            By the Numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold text-white text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight mb-4"
          >
            Execution at Scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary-200/60 text-[16px] max-w-xl mx-auto leading-relaxed"
          >
            Delivering mission-critical infrastructure programs that governments across India depend on.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-8">
          {STATS.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
