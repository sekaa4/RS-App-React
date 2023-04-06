import FormInput from 'models/FormInput';
import { InputType, InputTypeOption } from 'models/InputType';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import createOptionsObjectForRegister from 'utils/createOptionsObjectForRegister';
import cls from './UncontrolledInput.module.scss';

interface UncontrolledInputProps {
  classNames?: string[];
  type: InputTypeOption;
  id: string;
  propName: keyof FormInput;
  text?: string;
  min?: string;
  placeholder?: string;
  inputStyles?: string[];
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
}
const UncontrolledInput = (props: UncontrolledInputProps) => {
  const {
    classNames = '',
    type = 'text',
    id,
    propName,
    min,
    placeholder = '',
    inputStyles = [],
    text = '',
    register,
    errors,
  } = props;
  const { name, ref, onChange, onBlur } = register(propName, {
    validate: createOptionsObjectForRegister(type),
  });

  const classes = type === InputType.CHECKBOX ? cls['label-checkbox'] : cls.label;
  return (
    <div>
      <label htmlFor={id} className={[...classNames, classes].join(' ')}>
        {type !== InputType.CHECKBOX ? text : ''}
        <input
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          type={type}
          name={name}
          id={id}
          min={min}
          placeholder={placeholder}
          className={[cls.input, ...inputStyles].join(' ')}
        />
        {type === InputType.CHECKBOX ? text : ''}
      </label>
      <div className={cls.error}>{errors[name]?.message ?? ''}</div>
    </div>
  );
};

export default UncontrolledInput;
