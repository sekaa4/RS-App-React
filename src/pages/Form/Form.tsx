import { PureComponent } from 'react';
import cls from './Form.module.scss';

export default class Form extends PureComponent {
  render() {
    return (
      <div className={cls.form}>
        <h2>Form Page</h2>
      </div>
    );
  }
}
