import { motion } from 'framer-motion';
import { useInView, useCountUp } from '../hooks';
import { CheckCircle2 } from 'lucide-react';
import { STATES } from '../data/content';
import IndiaMapSVG from './IndiaMapSVG';

const PRESENCE_STATS = [
  { value: 8, label: 'States' },
  { value: 10, suffix: '+', label: 'Projects' },
  { value: 14, label: 'Milestones' },
];

function MiniCounter({ stat, isInView }) {
  const count = useCountUp(stat.value, 1800, isInView);
  return (
    <div className="text-center">
      <div className="font-mono font-bold text-primary-700 text-[2rem] leading-none mb-1">
        {count}{stat.suffix || ''}
      </div>
      <div className="text-neutral-500 text-[12px] font-medium">{stat.label}</div>
    </div>
  );
}

export default function IndiaMap() {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div ref={ref}>
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-primary-600 text-[12px] font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1 bg-primary-50 rounded-full"
            >
              Pan-India Operations
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-extrabold text-neutral-900 text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight mb-5 leading-tight"
            >
              Deep On-Ground<br className="hidden sm:block" /> Presence Across India
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-neutral-500 text-[16px] leading-relaxed mb-8 max-w-lg"
            >
              From Himalayan states to the Deccan plateau, we execute mission-critical government programs with local teams, regional expertise, and proven delivery capability.
            </motion.p>

            {/* Mini stat row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-8 mb-10 pb-8 border-b border-neutral-200"
            >
              {PRESENCE_STATS.map((stat, i) => (
                <MiniCounter key={i} stat={stat} isInView={isInView} />
              ))}
            </motion.div>

            {/* State list */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {STATES.map((state, i) => (
                <motion.div
                  key={state}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                  className="flex items-center gap-2.5 text-[14px] text-neutral-700 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  {state}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — India Map SVG */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative max-w-[520px] mx-auto">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-100/50 to-primary-50/20 blur-2xl scale-110" />

              {/* Map container */}
              <div className="relative rounded-2xl bg-white border border-neutral-200 shadow-xl overflow-hidden p-6 sm:p-8">
                {/* Top label */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                    Operational Coverage
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    {STATES.length} States Active
                  </span>
                </div>

                {/* SVG Map */}
                <div className="w-full aspect-[612/696]">
                  <IndiaMapSVG isInView={isInView} />
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#dbeafe] border border-[#2563eb]" />
                    <span className="text-[11px] text-neutral-500 font-medium">Active Operations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#f1f5f9] border border-[#e2e8f0]" />
                    <span className="text-[11px] text-neutral-500 font-medium">Other States</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
