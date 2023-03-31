import FormInput from 'models/FormInput';
import { InputType } from 'models/InputType';
import { UseFormRegister } from 'react-hook-form';
import createOptionsObjectForRegister from 'utils/createOptionsObjectForRegister';
import cls from './UncontrolledRadioInput.module.scss';

interface UncontrolledRadioInputProps {
  classNames?: string[];
  id: string;
  propName: keyof FormInput;
  defaultValue: string;
  inputStyles?: string[];
  register: UseFormRegister<FormInput>;
}
const UncontrolledRadioInput = (props: UncontrolledRadioInputProps) => {
  const { classNames = '', id, propName, inputStyles = [], defaultValue, register } = props;
  const { name, ref, onChange, onBlur } = register(propName, {
    validate: createOptionsObjectForRegister(InputType.RADIO),
  });

  return (
    <label htmlFor={id} className={[...classNames, cls['radio-label']].join(' ')}>
      {defaultValue}
      <input
        ref={ref}
        type={InputType.RADIO}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        defaultValue={defaultValue}
        className={[cls['radio-input'], ...inputStyles].join(' ')}
      />
    </label>
  );
};

export default UncontrolledRadioInput;
