import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks';
import { MILESTONES } from '../data/content';
import { MapPin, Pause, Play, ChevronLeft, ChevronRight, Building2, Radio, Droplets, Map, Monitor, GraduationCap, FileText } from 'lucide-react';

// Category → real Unsplash images relevant to each domain
const CATEGORY_IMAGES = {
  eGovernance: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  GIS: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80',
  'Land Records': 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
  Telecom: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  WIA: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  Education: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
};

const CATEGORY_ICONS = {
  eGovernance: Building2,
  GIS: Map,
  'Land Records': FileText,
  Telecom: Radio,
  WIA: Droplets,
  Education: GraduationCap,
};

const YEARS = [...new Set(MILESTONES.map(m => m.year))].sort();
const BY_YEAR = {};
YEARS.forEach(y => { BY_YEAR[y] = MILESTONES.filter(m => m.year === y); });

const AUTO_CYCLE_MS = 5000;

function MilestoneCard({ item, index }) {
  const Icon = CATEGORY_ICONS[item.category] || Building2;
  const image = CATEGORY_IMAGES[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl cursor-default"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={item.category}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay — same pattern as Solutions cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/20 group-hover:via-neutral-900/80 transition-all duration-500" />
      </div>

      {/* Content — same structure as Solutions cards */}
      <div className="relative z-10 flex flex-col justify-end p-7 min-h-[300px] lg:min-h-[340px]">
        {/* Top: Icon badge + Year */}
        <div className="mb-auto flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-white/[0.12] backdrop-blur-sm border border-white/[0.12] flex items-center justify-center group-hover:bg-white/[0.18] transition-all duration-500">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-mono font-bold text-[13px] text-white/40 bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm rounded-lg px-3 py-1.5">
            {item.year}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          {/* Category + State tags */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full bg-white/[0.12] backdrop-blur-sm border border-white/[0.1] text-white/80">
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50">
              <MapPin className="w-3 h-3" />
              {item.state}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-white text-[20px] lg:text-[22px] leading-snug mb-4 tracking-tight group-hover:text-white transition-colors">
            {item.description}
          </h3>

          {/* Bottom accent line */}
          <div className="w-full h-[2px] rounded-full bg-white/[0.08]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-primary-400 origin-left"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeYear, setActiveYear] = useState(YEARS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const activeItems = BY_YEAR[activeYear];
  const yearIdx = YEARS.indexOf(activeYear);

  // Auto-cycle
  useEffect(() => {
    if (!isInView || !isPlaying) {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(progressRef.current);
      return;
    }

    const startTime = performance.now();
    const tick = (now) => {
      const pct = Math.min((now - startTime) / AUTO_CYCLE_MS, 1);
      setProgress(pct);
      if (pct < 1) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      setActiveYear(prev => {
        const idx = YEARS.indexOf(prev);
        return idx < YEARS.length - 1 ? YEARS[idx + 1] : YEARS[0];
      });
      setProgress(0);
    }, AUTO_CYCLE_MS);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(progressRef.current);
    };
  }, [isInView, isPlaying, activeYear]);

  const goTo = (year) => {
    setActiveYear(year);
    setProgress(0);
  };

  const prev = () => yearIdx > 0 && goTo(YEARS[yearIdx - 1]);
  const next = () => yearIdx < YEARS.length - 1 && goTo(YEARS[yearIdx + 1]);

  return (
    <section id="projects" className="relative overflow-hidden">
      {/* Dark blue background — same as Stats section */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />

      {/* Subtle grid pattern — same as Stats */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Glow effects — same as Stats */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-primary-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-blue-400/8 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
        {/* Header — same pattern as Stats dark header */}
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-primary-300 text-[12px] font-bold uppercase tracking-[0.2em] mb-3 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full backdrop-blur-sm"
          >
            Our Journey &middot; Since 2015
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold text-white text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight mb-4"
          >
            Landmark Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary-200/60 text-[16px] max-w-xl mx-auto leading-relaxed"
          >
            A decade of building India's most critical digital infrastructure across 10 states.
          </motion.p>
        </div>

        {/* Year navigation — horizontal pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          {/* Prev button — same style as Hero nav arrows */}
          <button
            onClick={prev}
            disabled={yearIdx === 0}
            className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Year pills */}
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
            {YEARS.map((year, i) => {
              const isCurrent = year === activeYear;
              const isPast = i < yearIdx;
              return (
                <button
                  key={year}
                  onClick={() => goTo(year)}
                  className="relative"
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activeYearPill"
                      className="absolute inset-0 bg-primary-600 rounded-lg shadow-lg shadow-primary-600/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 block px-3.5 py-2 rounded-lg text-[13px] font-bold font-mono transition-colors duration-200 ${
                    isCurrent
                      ? 'text-white'
                      : isPast
                      ? 'text-white/40 hover:text-white/70'
                      : 'text-white/25 hover:text-white/50'
                  }`}>
                    {year}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            disabled={yearIdx === YEARS.length - 1}
            className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Play/pause — same button style */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

        {/* Year + count indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-baseline gap-4 mb-8"
          >
            <span className="font-mono font-extrabold text-[4rem] lg:text-[5.5rem] leading-none text-white/[0.06] select-none">
              {activeYear}
            </span>
            <span className="text-primary-200/40 text-[14px] font-medium">
              {activeItems.length} project{activeItems.length > 1 ? 's' : ''} delivered
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Auto-cycle progress bar */}
        {isPlaying && (
          <div className="w-full max-w-md h-[2px] rounded-full bg-white/[0.07] mb-10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 origin-left"
              style={{ scaleX: progress }}
            />
          </div>
        )}

        {/* Milestone cards — same card pattern as Solutions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`grid gap-5 ${
              activeItems.length === 1
                ? 'grid-cols-1 max-w-lg'
                : activeItems.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {activeItems.map((item, i) => (
              <MilestoneCard
                key={`${activeYear}-${i}`}
                item={item}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom summary — same divider style as Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.07]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-14">
            {[
              { value: MILESTONES.length, label: 'Projects' },
              { value: YEARS.length, label: 'Years' },
              { value: '10', label: 'States' },
              { value: '6', label: 'Sectors' },
            ].map((stat, i) => (
              <div key={i} className="text-center flex items-center gap-3">
                <span className="font-mono font-bold text-primary-300 text-[1.75rem] leading-none">
                  {stat.value}
                </span>
                <span className="text-primary-200/40 text-[12px] font-medium uppercase tracking-[0.1em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
