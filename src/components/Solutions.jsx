import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { SOLUTIONS } from '../data/content';
import { Building2, Radio, Droplets, Map, Monitor, GraduationCap, ArrowRight } from 'lucide-react';

const ICON_MAP = { Building2, Radio, Droplets, Map, Monitor, GraduationCap };

// High-quality Unsplash images for each solution
const SOLUTION_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // eGovernance - modern building
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', // Telecom - network/fiber
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', // Water - water infrastructure
  'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80', // GIS - aerial/map view
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Command center - dashboards
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', // Education - classroom
];

function SolutionCard({ solution, index, isInView }) {
  const Icon = ICON_MAP[solution.icon];
  const isLarge = index < 2; // First two cards are larger

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        isLarge ? 'md:col-span-1 lg:col-span-1' : ''
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={SOLUTION_IMAGES[index]}
          alt={solution.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/20 group-hover:via-neutral-900/80 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col justify-end ${isLarge ? 'p-8 min-h-[340px] lg:min-h-[400px]' : 'p-7 min-h-[300px] lg:min-h-[340px]'}`}>
        {/* Category badge */}
        <div className="mb-auto">
          <div className="w-11 h-11 rounded-xl bg-white/[0.12] backdrop-blur-sm border border-white/[0.12] flex items-center justify-center group-hover:bg-white/[0.18] transition-all duration-500">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Text content */}
        <div>
          <h3 className={`font-heading font-bold text-white mb-2.5 tracking-tight ${isLarge ? 'text-[22px] lg:text-[26px]' : 'text-[20px] lg:text-[22px]'}`}>
            {solution.title}
          </h3>

          <p className="text-white/60 text-[14px] leading-relaxed mb-5 max-w-[360px] line-clamp-3 group-hover:text-white/75 transition-colors duration-300">
            {solution.description}
          </p>

          {/* CTA link */}
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-white group-hover:gap-3 transition-all duration-300">
            Explore
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="solutions" className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div
          ref={ref}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-primary-600 text-[12px] font-bold uppercase tracking-[0.2em] mb-3 px-3 py-1 bg-primary-50 rounded-full"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-extrabold text-neutral-900 text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight mb-4"
            >
              Our Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-neutral-500 text-[16px] max-w-xl leading-relaxed"
            >
              Comprehensive infrastructure solutions powering India's digital governance transformation.
            </motion.p>
          </div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold text-[14px] rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 self-start lg:self-auto"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Grid — 2 large + 4 smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((solution, i) => (
            <SolutionCard key={i} solution={solution} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
