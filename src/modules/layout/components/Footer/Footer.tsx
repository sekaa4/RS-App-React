import { PureComponent } from 'react';
import cls from './Footer.module.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className={cls.container}>
        <div className={cls.footer}>RS School 2023</div>
      </footer>
    );
  }
}
