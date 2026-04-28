import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

export function HoverBorderGradient({
  children,
  containerClassName = '',
  className = '',
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(270, 80%, 60%) 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(270, 80%, 60%) 0%, rgba(255, 255, 255, 0) 100%)',
    BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(270, 80%, 60%) 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(270, 80%, 60%) 0%, rgba(255, 255, 255, 0) 100%)',
  };

  const highlight =
    'radial-gradient(75% 181.16% at 50% 50%, #a855f7 0%, rgba(255, 255, 255, 0) 100%)';

  useEffect(() => {
    if (!hovered) {
      const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
      const interval = setInterval(() => {
        setDirection((prev) => {
          const i = directions.indexOf(prev);
          const next = clockwise
            ? (i - 1 + directions.length) % directions.length
            : (i + 1) % directions.length;
          return directions[next];
        });
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex rounded-full border border-transparent content-center bg-white/5 hover:bg-white/10 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit ${containerClassName}`}
      {...props}
    >
      <div
        className={`w-auto text-white z-10 bg-white/[0.05] backdrop-blur-xl px-5 py-2.5 rounded-[inherit] flex items-center space-x-2 text-sm font-medium ${className}`}
      >
        {children}
      </div>
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration }}
      />
      <div className="bg-surface/80 backdrop-blur-xl absolute z-[1] flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
