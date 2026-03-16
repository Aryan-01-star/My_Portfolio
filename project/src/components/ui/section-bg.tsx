import { motion } from 'framer-motion';

/** Floating circuit-like grid with animated nodes — for Skills */
export const CircuitGrid = () => {
  const nodes = [
    { x: '10%', y: '20%', delay: 0 },
    { x: '30%', y: '70%', delay: 0.5 },
    { x: '55%', y: '15%', delay: 1 },
    { x: '75%', y: '55%', delay: 1.5 },
    { x: '90%', y: '30%', delay: 0.8 },
    { x: '20%', y: '85%', delay: 1.2 },
    { x: '85%', y: '80%', delay: 0.3 },
  ];

  const lines = [
    { x1: '10%', y1: '20%', x2: '30%', y2: '70%' },
    { x1: '30%', y1: '70%', x2: '55%', y2: '15%' },
    { x1: '55%', y1: '15%', x2: '75%', y2: '55%' },
    { x1: '75%', y1: '55%', x2: '90%', y2: '30%' },
    { x1: '20%', y1: '85%', x2: '55%', y2: '15%' },
    { x1: '85%', y1: '80%', x2: '75%', y2: '55%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="#a855f7"
            strokeWidth="1"
            opacity={0.15}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x} cy={node.y} r="4"
            fill="#a855f7"
            opacity={0.25}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: node.delay }}
          />
        ))}
        {/* Animated pulse on nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={node.x} cy={node.y} r="4"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            opacity={0.3}
            animate={{ scale: [1, 4], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, delay: node.delay + 1, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}
      </svg>
    </div>
  );
};

/** Floating code brackets — for Projects */
export const FloatingBrackets = () => {
  const symbols = [
    { char: '</', x: '5%', y: '12%', size: 36, delay: 0, dur: 7 },
    { char: '/>', x: '90%', y: '18%', size: 32, delay: 0.5, dur: 8 },
    { char: '{ }', x: '12%', y: '78%', size: 28, delay: 1, dur: 6 },
    { char: '( )', x: '85%', y: '72%', size: 30, delay: 0.8, dur: 9 },
    { char: '[ ]', x: '50%', y: '88%', size: 24, delay: 1.5, dur: 7.5 },
    { char: '=>', x: '72%', y: '8%', size: 28, delay: 0.3, dur: 8.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((s, i) => (
        <motion.div
          key={i}
          className="absolute font-mono font-bold select-none"
          style={{ left: s.x, top: s.y, fontSize: s.size, color: 'rgba(168, 85, 247, 0.12)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: s.delay, duration: 0.6 }}
        >
          <motion.span
            className="inline-block"
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
          >
            {s.char}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

/** Animated graduation path — for Education */
export const GradPath = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
      {/* Flowing knowledge path */}
      <motion.path
        d="M 0 200 C 100 100, 200 300, 300 200 S 500 100, 600 200 S 700 300, 800 200"
        fill="none"
        stroke="#a855f7"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        opacity={0.15}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />
      {/* Milestone dots along the path */}
      {[
        { cx: 150, cy: 150 },
        { cx: 400, cy: 200 },
        { cx: 650, cy: 150 },
      ].map((dot, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={dot.cx} cy={dot.cy} r="6"
            fill="#a855f7"
            opacity={0.25}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.5, type: 'spring' }}
          />
          <motion.circle
            cx={dot.cx} cy={dot.cy} r="6"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            animate={{ scale: [1, 3], opacity: [0.4, 0] }}
            transition={{ duration: 2, delay: 1.5 + i * 0.5, repeat: Infinity, repeatDelay: 4 }}
          />
        </motion.g>
      ))}

      {/* Traveling dot along the path */}
      <motion.circle
        r="3"
        fill="#a855f7"
        opacity={0.4}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        style={{ offsetPath: "path('M 0 200 C 100 100, 200 300, 300 200 S 500 100, 600 200 S 700 300, 800 200')" }}
      />
    </svg>
  </div>
);

/** Floating badge/seal outlines — for Certifications */
export const FloatingBadges = () => {
  const badges = [
    { x: '8%', y: '20%', size: 60, delay: 0, dur: 6 },
    { x: '88%', y: '30%', size: 50, delay: 0.5, dur: 7 },
    { x: '20%', y: '75%', size: 45, delay: 1, dur: 8 },
    { x: '78%', y: '78%', size: 55, delay: 0.8, dur: 6.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {badges.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.x, top: b.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: b.delay, type: 'spring' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width={b.size} height={b.size} viewBox="0 0 40 40">
              {/* Hexagonal badge outline */}
              <polygon
                points="20,2 36,11 36,29 20,38 4,29 4,11"
                fill="none"
                stroke="#a855f7"
                strokeWidth="1"
                opacity={0.15}
              />
              {/* Inner star */}
              <polygon
                points="20,10 23,17 30,17 24,22 26,29 20,25 14,29 16,22 10,17 17,17"
                fill="none"
                stroke="#a855f7"
                strokeWidth="0.7"
                opacity={0.1}
              />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
