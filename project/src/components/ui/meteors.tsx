import React, { useMemo } from 'react';

export const Meteors = ({
  number = 20,
  className = '',
}: {
  number?: number;
  className?: string;
}) => {
  const meteorStyles = useMemo(() => {
    return Array.from({ length: number }, () => ({
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 12 + 's',
      animationDuration: Math.floor(Math.random() * 8 + 5) + 's',
    }));
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={`animate-meteor-effect absolute h-[1px] w-[1px] rounded-full bg-white shadow-[0_0_8px_3px_rgba(192,132,252,0.6)] before:absolute before:top-1/2 before:h-[0.5px] before:w-[60px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-white/90 before:via-purple-300/70 before:to-transparent before:content-[''] ${className}`}
          style={style}
        />
      ))}
    </>
  );
};
