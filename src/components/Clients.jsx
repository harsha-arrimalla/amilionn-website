import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { Shield } from 'lucide-react';

// Government client logos/names — these are real government bodies Amilionn works with
const CLIENTS = [
  { name: 'BSNL', subtitle: 'Bharat Sanchar Nigam' },
  { name: 'NIC', subtitle: 'National Informatics Centre' },
  { name: 'APDCL', subtitle: 'AP Discoms' },
  { name: 'PHED', subtitle: 'Public Health Engineering' },
  { name: 'BSPHCL', subtitle: 'Bihar State Power' },
  { name: 'UPSRTC', subtitle: 'UP State Road Transport' },
];

const TRUST_BADGES = [
  { label: 'ISO 9001:2015', desc: 'Quality Management' },
  { label: 'ISO 27001', desc: 'Information Security' },
  { label: 'CMMI Level 3', desc: 'Process Maturity' },
];

export default function Clients() {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section id="clients" className="py-16 lg:py-20 bg-neutral-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div ref={ref} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-primary-600 text-[12px] font-bold uppercase tracking-[0.2em] mb-3 px-3 py-1 bg-primary-50 rounded-full"
          >
            Trusted Partners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold text-neutral-900 text-3xl sm:text-4xl tracking-tight mb-4"
          >
            Trusted by Government Bodies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-neutral-500 text-[16px] max-w-xl mx-auto leading-relaxed"
          >
            Partnering with India's leading public sector organizations to deliver critical infrastructure.
          </motion.p>
        </div>

        {/* Client logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-neutral-200 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/40 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
                <span className="font-heading font-extrabold text-primary-600 text-[14px]">{client.name}</span>
              </div>
              <span className="text-neutral-400 text-[11px] font-medium text-center leading-tight">{client.subtitle}</span>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {TRUST_BADGES.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-neutral-200"
            >
              <Shield className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <div>
                <span className="font-heading font-bold text-neutral-800 text-[13px] block">{badge.label}</span>
                <span className="text-neutral-400 text-[11px]">{badge.desc}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
