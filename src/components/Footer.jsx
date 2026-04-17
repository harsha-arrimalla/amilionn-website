import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { ArrowRight, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

export default function Footer() {
  const [ctaRef, ctaInView] = useInView();
  const [footRef, footInView] = useInView();

  return (
    <footer id="contact" className="relative">
      {/* CTA Section — full-bleed dark blue */}
      <div className="relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary-500/15 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left text */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-heading font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-5 leading-tight"
              >
                Ready to build the future of governance?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-primary-200/70 text-[17px] max-w-md leading-relaxed"
              >
                Partner with Amilionn to deliver mission-critical infrastructure programs that transform how India governs.
              </motion.p>
            </div>

            {/* Right CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <motion.a
                initial={{ opacity: 0, scale: 0.95 }}
                animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="mailto:info@amilionn.com"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-primary-700 font-bold text-[15px] rounded-xl hover:bg-primary-50 transition-colors shadow-xl shadow-black/10"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                initial={{ opacity: 0, scale: 0.95 }}
                animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#solutions"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/[0.08] border border-white/[0.15] text-white font-bold text-[15px] rounded-xl hover:bg-white/[0.15] transition-colors backdrop-blur-sm"
              >
                View Solutions
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer body */}
      <div className="bg-neutral-950">
        <motion.div
          ref={footRef}
          initial={{ opacity: 0 }}
          animate={footInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
            {/* Brand — wider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                  <span className="text-white font-heading font-extrabold text-[16px]">A</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-white text-[17px] block leading-tight">Amilionn</span>
                  <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-[0.12em]">Technologies Pvt Ltd</span>
                </div>
              </div>
              <p className="text-neutral-500 text-[14px] leading-relaxed max-w-[300px] mb-6">
                Delivering mission-critical eGov infrastructure across India since 2010. From digital governance to water automation — we build what governments depend on.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-5">Quick Links</h4>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.slice(0, 5).map((link) => (
                  <a key={link.label} href={link.href} className="text-[14px] text-neutral-500 hover:text-white hover:translate-x-1 transition-all duration-200">
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-5">Solutions</h4>
              <div className="flex flex-col gap-3">
                {['eGovernance', 'Telecom (BharatNet)', 'Water Automation', 'GIS Solutions', 'Command & Control', 'Education ICT'].map((s) => (
                  <a key={s} href="#solutions" className="text-[14px] text-neutral-500 hover:text-white hover:translate-x-1 transition-all duration-200">
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-5">Contact Us</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 text-neutral-500 text-[14px]">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                  <span>Hyderabad, Telangana<br />India</span>
                </div>
                <div className="flex items-start gap-3 text-neutral-500 text-[14px]">
                  <Mail className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                  <a href="mailto:info@amilionn.com" className="hover:text-white transition-colors">info@amilionn.com</a>
                </div>
                <div className="flex items-start gap-3 text-neutral-500 text-[14px]">
                  <Phone className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                  <a href="tel:+914012345678" className="hover:text-white transition-colors">+91 40 1234 5678</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-[13px]">
              &copy; {new Date().getFullYear()} Amilionn Technologies Private Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-neutral-600 text-[13px] hover:text-neutral-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-600 text-[13px] hover:text-neutral-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-600 text-[13px] hover:text-neutral-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
