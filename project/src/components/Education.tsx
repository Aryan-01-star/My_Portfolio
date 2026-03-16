import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GradPath } from './ui/section-bg';

const TimelineItem = ({ year, title, institution, description, index }: {
  year: string;
  title: string;
  institution: string;
  description: string;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-10 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 h-full w-px bg-white/5">
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: '100%' } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="absolute top-0 left-0 w-full bg-purple-500/20"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.15 }}
          className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-surface"
        />
      </div>

      <div className="space-y-1.5">
        <span className="text-purple-400 text-xs font-medium tracking-wider">{year}</span>
        <h3 className="text-base font-medium text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{institution}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-14 sm:py-20 relative">
      <GradPath />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-purple-400 text-sm font-medium tracking-wide mb-3">BACKGROUND</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Education
            </h2>
          </motion.div>
          <div className="max-w-xl mx-auto">
            <TimelineItem
              index={0}
              year="2022 — PRESENT"
              title="Bachelor of Computer Science"
              institution="Sharda University — CGPA: 8.1"
              description="Focused on Software Development, DSA, and core CS fundamentals"
            />
            <TimelineItem
              index={1}
              year="2021 — 2022"
              title="Senior Secondary"
              institution="Laxmi Public School — CGPA: 8.3"
              description="Completed senior secondary education with a major in Science"
            />
          </div>
      </div>
    </section>
  );
};

export default Education;
