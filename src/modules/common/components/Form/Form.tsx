import { PropsWithChildren, PureComponent } from 'react';
import cls from './Form.module.scss';

interface FormProps {
  refForm: React.RefObject<HTMLFormElement>;
  description: string;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default class Form extends PureComponent<PropsWithChildren<FormProps>> {
  refForm: React.RefObject<HTMLFormElement>;

  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;

  constructor(props: PropsWithChildren<FormProps>) {
    super(props);
    const { refForm, submitHandler } = this.props;
    this.refForm = refForm;
    this.submitHandler = submitHandler;
  }

  render() {
    const { children, description } = this.props;

    return (
      <form className={cls['form-container']} ref={this.refForm} onSubmit={this.submitHandler}>
        <fieldset className={cls.fieldset}>
          <legend className={cls.legend}>{description}</legend>
          {children}
        </fieldset>
      </form>
    );
  }
}
