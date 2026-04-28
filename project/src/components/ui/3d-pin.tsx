import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PinContainer = ({
  children,
  title,
  href,
  className = '',
  containerClassName = '',
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      className={`relative group/pin z-50 cursor-pointer ${containerClassName}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...wrapperProps}
    >
      <div
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 [perspective:1000px] [transform:translate(-50%,-50%)_rotateX(70deg)_translateZ(0deg)]"
      >
        <motion.div
          initial={{ x: '-50%', y: '-50%', rotateX: 0, scale: 1 }}
          animate={{
            x: '-50%',
            y: '-50%',
            rotateX: hovered ? 40 : 0,
            scale: hovered ? 0.8 : 1,
          }}
          transition={{ duration: 0.7 }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-surface border border-white/[0.1] group-hover/pin:border-white/[0.2] overflow-hidden will-change-transform"
        >
          <div className={`relative z-50 ${className}`}>{children}</div>
        </motion.div>
      </div>
      <PinPerspective title={title} hovered={hovered} />
    </Wrapper>
  );
};

const PinPerspective = ({ title, hovered }: { title?: string; hovered: boolean }) => {
  return (
    <AnimatePresence>
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none w-full h-80 flex items-center justify-center z-[60]"
        >
          <div className="w-full h-full -mt-7 flex-none inset-0">
            {/* Title capsule */}
            <div className="absolute top-0 inset-x-0 flex justify-center">
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative flex items-center justify-center z-10 rounded-full bg-[#0a0a0f] py-1 px-5 border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.15)] whitespace-nowrap"
              >
                <span className="relative z-20 text-white text-[11px] font-medium tracking-wide">
                  {title}
                </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5" />
                <span className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-400/80 to-transparent" />
              </motion.span>
            </div>

            {/* Animated pin line */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 160, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-purple-500 translate-y-[14px] w-px blur-[2px]"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 160, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-purple-500 translate-y-[14px] w-px"
            />

            {/* Glowing dot at pin point */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-purple-500 translate-y-[14px] w-[6px] h-[6px] rounded-full z-40 blur-[3px]"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-purple-300 translate-y-[14px] w-[3px] h-[3px] rounded-full z-40"
            />

            {/* Expanding ring effect at dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: [0, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute right-1/2 -translate-x-[3px] bottom-1/2 translate-y-[11px] w-[10px] h-[10px] rounded-full border border-purple-400/50 z-30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
