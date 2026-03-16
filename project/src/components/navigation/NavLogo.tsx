import { Link } from 'react-scroll';

export const NavLogo = () => {
  return (
    <Link
      to="home"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      className="text-white text-lg font-medium cursor-pointer tracking-tight"
    >
      aryan<span className="text-purple-500">.</span>
    </Link>
  );
};
