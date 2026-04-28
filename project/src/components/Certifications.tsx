import { useState, useEffect, useCallback } from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PinContainer } from './ui/3d-pin';
import { FloatingBadges } from './ui/section-bg';

const certifications = [
  {
    title: 'Oracle Cloud Infrastructure AI Foundations',
    issuer: 'Oracle',
    year: '2025',
  },
  {
    title: 'Full-Stack Web Development',
    issuer: 'Internshala',
    year: '2023',
  },
  {
    title: 'Java Foundations & 3D Animation',
    issuer: 'Oracle Academy',
    year: '2022',
  },
];

const CertCardContent = ({ title, issuer, year }: {
  title: string;
  issuer: string;
  year: string;
}) => (
  <div className="p-5 rounded-2xl border border-white/15 bg-surface-overlay shadow-lg shadow-black/30">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-purple-500/15 shrink-0">
        <Award size={18} className="text-purple-300" />
      </div>
      <span className="text-xs text-purple-300 font-semibold tracking-wider">{year}</span>
    </div>
    <h3 className="text-base font-semibold text-white leading-snug mb-2">{title}</h3>
    <p className="text-xs text-gray-300">Issued by <span className="text-gray-100 font-medium">{issuer}</span></p>
  </div>
);

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % certifications.length), []);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section id="certifications" className="py-14 sm:py-20 relative">
      <FloatingBadges />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-8"
        >
          <p className="text-purple-400 text-sm font-medium tracking-wide mb-3">CREDENTIALS</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Certifications
          </h2>
        </motion.div>

        {/* Desktop: Pin grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-0 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-[24rem] flex items-center justify-center"
            >
              <PinContainer title={cert.issuer}>
                <div className="flex flex-col p-2 w-[13rem] h-[13rem] justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-purple-500/15 shrink-0">
                        <Award size={16} className="text-purple-300" />
                      </div>
                      <span className="text-xs text-purple-300 font-semibold tracking-wider">{cert.year}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-white leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 mt-2">
                    Issued by <span className="text-gray-100 font-medium">{cert.issuer}</span>
                  </p>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <CertCardContent {...certifications[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex space-x-1.5">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to certification ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-purple-500 w-5'
                      : 'bg-white/10 w-1.5'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                aria-label="Previous certification"
                onClick={prev}
                className="p-2 rounded-full border border-white/10 text-gray-400 active:scale-95 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Next certification"
                onClick={next}
                className="p-2 rounded-full border border-white/10 text-gray-400 active:scale-95 transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
