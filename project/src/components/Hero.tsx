import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Eye, ArrowDown } from 'lucide-react';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { PointerHighlight } from './ui/pointer-highlight';
import { EncryptedText } from './ui/encrypted-text';
import DevSetup from './DevSetup';

const Hero: React.FC = () => {

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 lg:pt-4 lg:items-start relative overflow-hidden">
      {/* Lightweight ambient glows — no blur filter */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] sm:w-[700px] sm:h-[700px] glow-purple rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] glow-blue rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6 lg:w-1/2 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-purple-400 text-xs sm:text-sm font-medium tracking-wide">Available for work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          >
            Hi, I'm{' '}
            <EncryptedText
              text="Aryan"
              className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
              encryptedClassName="text-purple-400/60"
              revealDelayMs={120}
              flipDelayMs={40}
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <PointerHighlight
              rectangleClassName="border-purple-500/40"
              pointerClassName="text-purple-400"
              containerClassName="inline-block"
            >
              <span className="text-lg sm:text-xl text-gray-400 font-light px-2 py-1">
                Software Developer & UI/UX Designer
              </span>
            </PointerHighlight>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 max-w-md mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed"
          >
            I building reliable, high-performance software, web and apps
            with clean, responsive UI/UX and strong problem-solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2"
          >
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HoverBorderGradient as="div" duration={1.5}>
                <Eye size={16} />
                <span>Resume</span>
              </HoverBorderGradient>
            </a>
            <Link to="projects" smooth={true} duration={500} offset={-70}>
              <HoverBorderGradient as="div" duration={1.5} clockwise={false}>
                <span>View Projects</span>
              </HoverBorderGradient>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="relative lg:w-1/2 w-full h-[35vh] sm:h-[50vh] lg:h-[70vh] flex items-center justify-center mt-8 sm:mt-16 lg:mt-40"
        >
          <DevSetup />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center space-y-2"
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
