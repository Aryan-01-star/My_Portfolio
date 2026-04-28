import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';
import { NavLogo } from './NavLogo';
import { MobileMenu } from './MobileMenu';
import { FloatingDockNav } from './FloatingDockNav';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();

  return createPortal(
    <nav
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] h-[60px] w-[calc(100%-24px)] max-w-[1120px] rounded-2xl bg-transparent"
    >
      <div className="px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <NavLogo />

          {/* Desktop Navigation — Floating Dock */}
          <FloatingDockNav items={navItems} activeSection={activeSection} />

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            activeSection={activeSection}
            navItems={navItems}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>,
    document.body
  );
};
