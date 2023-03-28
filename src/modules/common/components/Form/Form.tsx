import { PropsWithChildren } from 'react';
import cls from './Form.module.scss';

interface FormProps {
  refForm: React.RefObject<HTMLFormElement>;
  description: string;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}
const Form = (props: PropsWithChildren<FormProps>) => {
  const { refForm, submitHandler, children, description } = props;

  return (
    <form className={cls['form-container']} ref={refForm} onSubmit={submitHandler}>
      <fieldset className={cls.fieldset}>
        <legend className={cls.legend}>{description}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default Form;
