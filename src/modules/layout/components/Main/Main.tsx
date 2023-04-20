import { Outlet } from 'react-router-dom';
import cls from './Main.module.scss';

const Main = () => {
  return (
    <main className={cls.container}>
      <Outlet />
    </main>
  );
};

export default Main;
