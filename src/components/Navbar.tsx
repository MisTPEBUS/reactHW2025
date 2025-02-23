import { Link } from "react-router-dom";

interface NavLink {
  label: string;
  path: string;
}

interface NavbarProps {
  links: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <nav className="fixed top-0 left-0 w-full shadow-lg z-50 bg-gradient-to-r from-primary to-primary-light text-white">
      <div className="flex container justify-between p-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/Week1"
              className="hover:text-primary-dark transition-colors duration-300 text-lg"
            >
              Home
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-8">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="hover:text-primary-dark transition-colors duration-300 text-lg"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
