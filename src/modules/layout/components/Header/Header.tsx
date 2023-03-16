import Endpoints from 'models/Endpoints';
import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { WithRouterProps } from 'utils/withRouterHOC';
import cls from './Header.module.scss';

interface ActiveObjectLink {
  isActive: boolean;
  isPending: boolean;
}

export default class Header extends PureComponent<WithRouterProps> {
  render() {
    const isActiveLink = ({ isActive }: ActiveObjectLink) =>
      isActive ? cls['active-link'] : cls.link;
    const { location } = this.props;

    let title: string;
    switch (location.pathname) {
      case Endpoints.HOME:
        title = 'Home Page';
        break;
      case Endpoints.ABOUT:
        title = 'About Page';
        break;
      default:
        title = 'Not Found Page';
        break;
    }

    return (
      <header className={cls.container}>
        <div className={cls.header}>
          <h1>{title}</h1>
          <nav>
            <ul className={cls['link-list']}>
              <li>
                <NavLink to="/" className={isActiveLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={isActiveLink}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
