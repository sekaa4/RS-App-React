import { PureComponent } from 'react';
import { Outlet } from 'react-router-dom';
import cls from './Main.module.scss';

export default class Main extends PureComponent {
  render() {
    return (
      <main className={cls.container}>
        <Outlet />
      </main>
    );
  }
}
