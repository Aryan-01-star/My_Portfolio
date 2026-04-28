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
      className={`relative inline-block ${containerClassName}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...wrapperProps}
    >
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-2xl bg-surface-overlay border border-white/15 hover:border-purple-400/50 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-purple-500/10 transition-colors duration-300 overflow-hidden"
      >
        <div className={className}>{children}</div>
      </motion.div>
      <PinPerspective title={title} hovered={hovered} />
    </Wrapper>
  );
};

const PinPerspective = ({
  title,
  hovered,
}: {
  title?: string;
  hovered: boolean;
}) => (
  <AnimatePresence>
    {hovered && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0 z-[60]"
      >
        {/* Title capsule + string above the card */}
        <div className="absolute inset-x-0 bottom-full flex flex-col items-center pb-1">
          <motion.span
            initial={{ y: 8, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative rounded-full bg-[#0a0a0f] py-1 px-5 border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.2)] whitespace-nowrap text-white text-[11px] font-medium tracking-wide mb-1"
          >
            {title}
            <span className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-400/80 to-transparent" />
          </motion.span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-px bg-gradient-to-b from-transparent to-purple-500"
          />
        </div>

        {/* Glowing dot at the top edge of the card */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[6px] h-[6px] rounded-full bg-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.9)]"
        />

        {/* Expanding ring pulse at the dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: [0, 2.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-[10px] h-[10px] rounded-full border border-purple-400/50"
        />
      </motion.div>
    )}
  </AnimatePresence>
);
