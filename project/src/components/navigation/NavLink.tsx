import { Link } from 'react-scroll';

interface NavLinkProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

export const NavLink = ({
  id,
  label,
  isActive,
  onClick,
  isMobile = false,
}: NavLinkProps) => {
  const baseStyles = "cursor-pointer transition-all duration-300 text-sm";
  const mobileStyles = "block py-3 px-4 rounded-lg";
  const desktopStyles = "inline-block py-1 px-3 rounded-full";
  const activeStyles = isMobile
    ? "text-white bg-white/5"
    : "text-white bg-white/10";
  const inactiveStyles = isMobile
    ? "text-gray-500 hover:text-gray-300 hover:bg-white/5"
    : "text-gray-500 hover:text-gray-300";

  return (
    <Link
      to={id}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      className={`
        ${baseStyles}
        ${isMobile ? mobileStyles : desktopStyles}
        ${isActive ? activeStyles : inactiveStyles}
      `}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};
