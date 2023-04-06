import FormInput from 'models/FormInput';
import { PropsWithChildren } from 'react';
import { UseFormHandleSubmit, SubmitHandler } from 'react-hook-form';
import cls from './Form.module.scss';

interface FormProps {
  refForm: React.RefObject<HTMLFormElement>;
  description: string;
  submitHandler: SubmitHandler<FormInput>;
  handleSubmit: UseFormHandleSubmit<FormInput>;
}

const Form = (props: PropsWithChildren<FormProps>) => {
  const { refForm, submitHandler, handleSubmit, children, description } = props;

  return (
    <form className={cls['form-container']} ref={refForm} onSubmit={handleSubmit(submitHandler)}>
      <fieldset className={cls.fieldset}>
        <legend className={cls.legend}>{description}</legend>
        {children}
      </fieldset>
    </form>
  );
};

export default Form;
