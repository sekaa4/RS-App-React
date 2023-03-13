import { NavLink } from 'react-router-dom';
import cls from './Header.module.scss';

interface ActiveObjectLink {
  isActive: boolean;
  isPending: boolean;
}

export default function Header() {
  const isActiveLink = ({ isActive }: ActiveObjectLink) => (isActive ? cls['active-link'] : '');

  return (
    <header>
      <NavLink to="/" className={isActiveLink}>
        Home
      </NavLink>
      <NavLink to="/about" className={isActiveLink}>
        About
      </NavLink>
    </header>
  );
}
