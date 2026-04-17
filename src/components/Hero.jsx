import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    tagline: 'eGov Infrastructure',
    headline: 'Building the Digital Backbone of India\'s Governance',
    description: 'State Data Centers, e-Governance applications, and digital workflow automation powering government services across 8 states.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    stat: { value: '₹1,500 Cr', label: 'Order Book' },
  },
  {
    tagline: 'Telecom Infrastructure',
    headline: 'Connecting Every Village Through BharatNet',
    description: 'End-to-end OFC network design and rollout, bringing last-mile broadband connectivity to rural India under the BharatNet program.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80',
    stat: { value: '10+', label: 'Active Projects' },
  },
  {
    tagline: 'Water Automation',
    headline: 'Smart SCADA Systems for Water Infrastructure',
    description: 'PLC-SCADA automation for lift irrigation schemes and drinking water supply — ensuring clean water reaches every household.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    stat: { value: '8', label: 'States Covered' },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  const imageVariants = {
    enter: { opacity: 0, scale: 1.08 },
    center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 1.03, transition: { duration: 0.6 } },
  };

  const textVariants = {
    enter: (d) => ({ opacity: 0, y: d > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, y: d > 0 ? -30 : 30, transition: { duration: 0.4 } }),
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden bg-neutral-900">
      {/* ── Background Image ── */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%22.8%22%20/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          {/* Tagline pill */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`tag-${current}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-white/80 text-[12px] font-semibold uppercase tracking-wider">
                  {slide.tagline}
                </span>
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.h1
              key={`h-${current}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="font-heading font-extrabold text-white text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.08] tracking-tight mb-6"
            >
              {slide.headline}
            </motion.h1>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.p
              key={`p-${current}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

          {/* CTA row */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`cta-${current}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              <a
                href="#solutions"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-neutral-900 font-bold text-[14px] rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Explore Solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/[0.08] hover:bg-white/[0.12] text-white font-semibold text-[14px] rounded-lg border border-white/[0.12] backdrop-blur-sm transition-all"
              >
                View Projects
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom bar: stats + controls ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-8">
          <div className="flex items-end justify-between">
            {/* Stat highlight */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stat-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="hidden sm:flex items-center gap-4 bg-white/[0.06] border border-white/[0.08] backdrop-blur-md rounded-xl px-6 py-4"
              >
                <span className="font-mono font-bold text-white text-2xl tracking-tight">
                  {slide.stat.value}
                </span>
                <div className="w-px h-8 bg-white/10" />
                <span className="text-white/50 text-[13px] font-medium">
                  {slide.stat.label}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Slide controls */}
            <div className="flex items-center gap-4">
              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="group relative flex items-center justify-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-500 ${
                        i === current
                          ? 'w-8 h-1.5 bg-white'
                          : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-1">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
