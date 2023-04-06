import FormInput from 'models/FormInput';
import { InputType } from 'models/InputType';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import createOptionsObjectForRegister from 'utils/createOptionsObjectForRegister';
import cls from './UncontrolledSelect.module.scss';

interface UncontrolledSelectProps {
  classNames?: string[];
  id: string;
  propName: keyof FormInput;
  text?: string;
  options: string[];
  errors: FieldErrors<FormInput>;
  register: UseFormRegister<FormInput>;
}
const UncontrolledTextArea = (props: UncontrolledSelectProps) => {
  const { classNames = '', id, text, propName, options, errors, register } = props;
  const { name, ref, onChange, onBlur } = register(propName, {
    validate: createOptionsObjectForRegister(InputType.SELECT_ONE),
  });

  return (
    <div>
      <label htmlFor={id} className={cls['label-select']}>
        {text}
        <select
          id={id}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className={[...classNames, cls.select].join(' ')}
        >
          <option value="" hidden>
            Choose One
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <div className={cls.error}>{errors[name]?.message ?? ''}</div>
    </div>
  );
};

export default UncontrolledTextArea;
