import FormContainer from 'modules/form-container/components/FormContainer/FormContainer';
import { PureComponent } from 'react';
import cls from './Form.module.scss';

export default class Form extends PureComponent {
  render() {
    return (
      <section className={cls.form}>
        <h2>Form Page</h2>
        <FormContainer />
      </section>
    );
  }
}
