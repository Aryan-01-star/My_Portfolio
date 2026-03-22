import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import DottedMap from 'dotted-map';

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}

const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export default function WorldMap({
  dots = [],
  lineColor = '#8b5cf6', // updated darker premium purple
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: 'diagonal' });
    return map.getSVG({
      radius: 0.22,
      color: '#ffffff',
      shape: 'circle',
      backgroundColor: 'transparent',
    });
  }, []);

  const svgDataUri = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`,
    [svgMap]
  );

  const computedDots = useMemo(
    () =>
      dots.map((dot) => ({
        start: projectPoint(dot.start.lat, dot.start.lng),
        end: projectPoint(dot.end.lat, dot.end.lng),
      })),
    [dots]
  );

  return (
    <div className="w-full aspect-[2/1] rounded-lg relative font-sans">
      <img
        src={svgDataUri}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          {/* Premium gradient */}
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c1d95" stopOpacity="0" />
            <stop offset="20%" stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="80%" stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {computedDots.map((dot, i) => (
          <g key={`path-${i}`}>
            <motion.path
              d={createCurvedPath(dot.start, dot.end)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4 * i, ease: 'easeOut' }}
            />

            {/* Start dot with glow */}
            <circle
              cx={dot.start.x}
              cy={dot.start.y}
              r="2.5"
              fill={lineColor}
              filter="url(#glow)"
            />

            {/* End dot with glow */}
            <circle
              cx={dot.end.x}
              cy={dot.end.y}
              r="2.5"
              fill={lineColor}
              filter="url(#glow)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
