import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
      title={title}
      {...wrapperProps}
    >
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-2xl bg-surface-overlay border border-white/15 hover:border-purple-400/50 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-purple-500/10 transition-colors duration-300 overflow-hidden"
      >
        <div className={className}>{children}</div>
      </motion.div>
    </Wrapper>
  );
};
