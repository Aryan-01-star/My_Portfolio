import { useState, useEffect, useCallback } from 'react';
import { Code, Server, Wrench, BookOpen, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PinContainer } from './ui/3d-pin';
import { CircuitGrid } from './ui/section-bg';

const skillsData = [
  {
    title: 'Frontend Development',
    icon: Code,
    skills: ['React.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML', 'REST APIs'],
  },
  {
    title: 'Backend & Databases',
    icon: Server,
    skills: ['Java', 'Python', 'Node.js', 'MySQL', 'MongoDB', 'JWT Auth'],
  },
  {
    title: 'Core CS & Concepts',
    icon: BookOpen,
    skills: ['DSA', 'System Design', 'OOP', 'MVC Architecture', 'Agile', 'DBMS'],
  },
  {
    title: 'Tools & Design',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Postman', 'Figma', 'Prototyping', 'QA Testing'],
  },
];

const SkillCardContent = ({ title, skills, icon: Icon }: {
  title: string;
  skills: string[];
  icon: LucideIcon;
}) => (
  <div className="p-5 rounded-2xl border border-white/15 bg-surface-overlay shadow-lg shadow-black/30">
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 rounded-lg bg-purple-500/15">
        <Icon className="text-purple-300" size={20} />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1.5 text-xs text-gray-200 bg-white/[0.07] rounded-lg border border-white/10"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const DesktopSkillCard = ({ title, skills, icon: Icon }: {
  title: string;
  skills: string[];
  icon: LucideIcon;
}) => (
  <div className="h-[26rem] w-full flex items-center justify-center">
    <PinContainer title={title}>
      <div className="flex flex-col p-4 tracking-tight w-[16rem] h-[15rem]">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 rounded-lg bg-purple-500/15">
            <Icon className="text-purple-300" size={20} />
          </div>
          <h3 className="font-bold text-base text-white">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-xs text-gray-200 bg-white/[0.07] rounded-lg border border-white/10"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </PinContainer>
  </div>
);

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % skillsData.length), []);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + skillsData.length) % skillsData.length);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section id="skills" className="py-14 sm:py-20 relative">
      <CircuitGrid />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-8"
        >
          <p className="text-purple-400 text-sm font-medium tracking-wide mb-3">WHAT I DO</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Desktop: Pin grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-4">
          {skillsData.map((item) => (
            <DesktopSkillCard key={item.title} {...item} />
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
                <SkillCardContent {...skillsData[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex space-x-1.5">
              {skillsData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to skill category ${index + 1}`}
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
                aria-label="Previous skill category"
                onClick={prev}
                className="p-2 rounded-full border border-white/10 text-gray-400 active:scale-95 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Next skill category"
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

export default Skills;
