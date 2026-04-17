import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-neutral-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center group-hover:bg-primary-700 transition-colors duration-200">
                <span className="text-white font-heading font-extrabold text-base leading-none">A</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-heading font-bold text-[17px] leading-tight tracking-tight transition-colors duration-300 ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
                  Amilionn
                </span>
                <span className={`text-[9px] font-medium uppercase tracking-[0.15em] leading-none mt-0.5 transition-colors duration-300 ${scrolled ? 'text-neutral-400' : 'text-white/50'}`}>
                  Technologies
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  href={link.href}
                  className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    scrolled
                      ? 'text-neutral-500 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                  scrolled
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-600/20'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-sm'
                }`}
              >
                Get in Touch
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-neutral-600 hover:bg-neutral-100' : 'text-white hover:bg-white/10'}`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white pt-[72px] lg:hidden"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3.5 text-[15px] font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-primary-600 text-white font-semibold rounded-lg text-[14px]"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
