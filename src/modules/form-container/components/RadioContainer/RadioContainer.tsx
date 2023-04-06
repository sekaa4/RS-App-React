import FormInput from 'models/FormInput';
import { PropsWithChildren } from 'react';
import { FieldErrors } from 'react-hook-form';
import cls from './RadioContainer.module.scss';

interface RadioContainerProps {
  name: keyof FormInput;
  errors: FieldErrors<FormInput>;
}
const RadioContainer = (props: PropsWithChildren<RadioContainerProps>) => {
  const { children, errors, name } = props;

  return (
    <fieldset className={cls.fieldset}>
      <legend>Choose Gender of your Cat</legend>
      <div className={cls['radio-group']}>{children}</div>
      <div className={cls.error}>{errors[name]?.message ?? ''}</div>
    </fieldset>
  );
};

export default RadioContainer;
