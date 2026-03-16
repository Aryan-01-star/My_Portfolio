import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCarousel from './ProjectCarousel';
import { FloatingBrackets } from './ui/section-bg';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-14 sm:py-20 relative">
      <FloatingBrackets />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-12 sm:space-y-16"
          >
            <div className="text-center">
              <p className="text-purple-400 text-sm font-medium tracking-wide mb-3">MY WORK</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Featured Projects
              </h2>
            </div>
            <ProjectCarousel />
          </motion.div>
      </div>
    </section>
  );
};

export default Projects;
