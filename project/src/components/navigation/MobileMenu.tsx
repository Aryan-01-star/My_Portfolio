import { motion } from 'framer-motion';
import { NavLink } from './NavLink';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  navItems: Array<{ id: string; label: string; }>;
  onClose: () => void;
}

export const MobileMenu = ({
  isOpen,
  activeSection,
  navItems,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-white/5"
    >
      <div className="px-4 pt-2 pb-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            {...item}
            isActive={activeSection === item.id}
            isMobile={true}
            onClick={onClose}
          />
        ))}
      </div>
    </motion.div>
  );
};
