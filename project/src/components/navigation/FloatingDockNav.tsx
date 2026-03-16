import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { Link } from 'react-scroll';

interface DockItem {
  id: string;
  label: string;
}

interface FloatingDockNavProps {
  items: DockItem[];
  activeSection: string;
  className?: string;
}

export const FloatingDockNav: React.FC<FloatingDockNavProps> = ({
  items,
  activeSection,
  className = '',
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`hidden md:flex items-end gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1.5 ${className}`}
    >
      {items.map((item) => (
        <DockNavItem
          key={item.id}
          mouseX={mouseX}
          id={item.id}
          label={item.label}
          isActive={activeSection === item.id}
        />
      ))}
    </motion.div>
  );
};

function DockNavItem({
  mouseX,
  id,
  label,
  isActive,
}: {
  mouseX: MotionValue;
  id: string;
  label: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleTransform = useTransform(distance, [-120, 0, 120], [1, 1.25, 1]);
  const scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  const yTransform = useTransform(distance, [-120, 0, 120], [0, -3, 0]);
  const y = useSpring(yTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  return (
    <Link
      to={id}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
    >
      <motion.div
        ref={ref}
        style={{ scale, y }}
        className={`relative cursor-pointer px-3 py-1 rounded-full text-sm transition-colors duration-300 origin-bottom ${
          isActive
            ? 'text-white bg-white/10'
            : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {label}
      </motion.div>
    </Link>
  );
}
