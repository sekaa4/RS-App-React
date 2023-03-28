import CustomRefObject from 'models/CustomRefObject.type';
import InputType from 'models/InputType';
import { useEffect, useRef } from 'react';
import cls from './UncontrolledRadioInput.module.scss';

interface UncontrolledRadioInputProps {
  classNames?: string[];
  id: string;
  refObject: React.RefObject<HTMLInputElement>[];
  name: string;
  defaultValue: string;
  inputStyles?: string[];
  errorObject: Record<keyof CustomRefObject, false | string>;
}
const UncontrolledRadioInput = (props: UncontrolledRadioInputProps) => {
  const {
    classNames = '',
    id,
    name,
    inputStyles = [],
    defaultValue,
    refObject,
    errorObject,
  } = props;
  const radioInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refObject.push(radioInput);
    errorObject[name] = false;
  }, [refObject, errorObject, name]);

  return (
    <label htmlFor={id} className={[...classNames, cls['radio-label']].join(' ')}>
      {defaultValue}
      <input
        ref={radioInput}
        type={InputType.RADIO}
        name={name}
        id={id}
        defaultValue={defaultValue}
        className={[cls['radio-input'], ...inputStyles].join(' ')}
      />
    </label>
  );
};

export default UncontrolledRadioInput;
