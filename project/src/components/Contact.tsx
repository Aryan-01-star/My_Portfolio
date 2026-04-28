import { Github, Linkedin, Mail, ArrowUpRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WorldMap from './ui/world-map';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Aryan-01-star',
    icon: Github,
    handle: '@Aryan-01-star',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aryan-kumar-p-7b4089253',
    icon: Linkedin,
    handle: 'Aryan Kumar P',
  },
  {
    label: 'X',
    href: 'https://x.com/Aryankp01',
    icon: X,
    handle: '@Aryankp01',
  },
  {
    label: 'Email',
    href: 'mailto:aryanpandey35247@gmail.com',
    icon: Mail,
    handle: 'aryanpandey35247',
  },
];

const mapDots = [
  { start: { lat: 28.4744, lng: 77.504 }, end: { lat: 37.7749, lng: -122.4194 } },
  { start: { lat: 28.4744, lng: 77.504 }, end: { lat: 51.5074, lng: -0.1278 } },
  { start: { lat: 28.4744, lng: 77.504 }, end: { lat: 35.6762, lng: 139.6503 } },
  { start: { lat: 28.4744, lng: 77.504 }, end: { lat: -33.8688, lng: 151.2093 } },
  { start: { lat: 28.4744, lng: 77.504 }, end: { lat: 1.3521, lng: 103.8198 } },
  { start: { lat: 28.4744, lng: 77.504 }, end: { lat: 52.52, lng: 13.405 } },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-14 sm:py-20 relative overflow-hidden">
      {/* World map background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15] hidden sm:flex">
        <div className="w-full max-w-5xl mx-auto">
          <WorldMap dots={mapDots} lineColor="#a955f76d" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-purple-400 text-sm font-medium tracking-wide mb-3">CONTACT</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let's Connect
          </h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm sm:text-base">
            I'm always open to new opportunities and interesting projects.
            Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {socials.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group flex items-center gap-4 sm:flex-col sm:items-center sm:text-center p-4 sm:p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors shrink-0">
                <social.icon size={20} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0 sm:flex-none">
                <div className="flex items-center gap-1 sm:justify-center">
                  <p className="text-sm font-medium text-white">{social.label}</p>
                  <ArrowUpRight size={12} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{social.handle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
