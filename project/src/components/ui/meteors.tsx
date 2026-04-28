import { useId, useMemo } from 'react';

export const Meteors = ({
  number = 20,
  className = '',
}: {
  number?: number;
  className?: string;
}) => {
  const rawId = useId();
  const scope = `m${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, idx) => ({
        idx,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: Math.floor(Math.random() * 8 + 5),
      })),
    [number]
  );

  const css = meteors
    .map(
      (m) =>
        `.${scope}-${m.idx}{top:${m.top}%;left:${m.left}%;animation-delay:${m.delay}s;animation-duration:${m.duration}s}`
    )
    .join('');

  return (
    <>
      <style>{css}</style>
      {meteors.map((m) => (
        <span
          key={m.idx}
          className={`${scope}-${m.idx} animate-meteor-effect absolute h-[1px] w-[1px] rounded-full bg-white shadow-[0_0_8px_3px_rgba(192,132,252,0.6)] before:absolute before:top-1/2 before:h-[0.5px] before:w-[60px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-white/90 before:via-purple-300/70 before:to-transparent before:content-[''] ${className}`}
        />
      ))}
    </>
  );
};
