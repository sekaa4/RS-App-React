import FormInput from 'models/FormInput';
import { InputType } from 'models/InputType';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import createOptionsObjectForRegister from 'utils/createOptionsObjectForRegister';
import cls from './UncontrolledTextArea.module.scss';

interface UncontrolledTextAreaProps {
  classNames?: string[];
  textAreaStyles?: string[];
  id: string;
  propName: keyof FormInput;
  text?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  defaultValue?: string;
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
}
const UncontrolledTextArea = (props: UncontrolledTextAreaProps) => {
  const {
    classNames = '',
    id,
    propName,
    text,
    rows = 4,
    cols = 28,
    placeholder = '',
    defaultValue,
    textAreaStyles = [],
    errors,
    register,
  } = props;

  const { name, ref, onChange, onBlur } = register(propName, {
    validate: createOptionsObjectForRegister(InputType.TEXTAREA),
  });

  return (
    <div>
      <label htmlFor={id} className={[...classNames, cls.label].join(' ')}>
        {text}
        <textarea
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          name={name}
          defaultValue={defaultValue}
          id={id}
          placeholder={placeholder}
          className={[cls.textarea, ...textAreaStyles].join(' ')}
          rows={rows}
          cols={cols}
        />
      </label>
      <div className={cls.error}>{errors[name]?.message ?? ''}</div>
    </div>
  );
};

export default UncontrolledTextArea;
