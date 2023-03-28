import CustomRefObject from 'models/CustomRefObject.type';
import InputType from 'models/InputType';
import { useEffect, useRef } from 'react';
import cls from './UncontrolledInput.module.scss';

interface UncontrolledInputProps {
  classNames?: string[];
  type: string;
  id: string;
  refObject: CustomRefObject;
  name?: string;
  text?: string;
  min?: string;
  placeholder?: string;
  inputStyles?: string[];
  defaultValue?: string;
  defaultChecked?: boolean;
  errorObject: Record<keyof CustomRefObject, false | string>;
}
const UncontrolledInput = (props: UncontrolledInputProps) => {
  const {
    classNames = '',
    type = 'text',
    id,
    name,
    min,
    placeholder = '',
    defaultValue,
    defaultChecked,
    inputStyles = [],
    text = '',
    refObject,
    errorObject,
  } = props;
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refObject[id] = input;
    errorObject[id] = false;
  }, [refObject, errorObject, id]);

  const isError = errorObject[id];
  const classes = type === InputType.CHECKBOX ? cls['label-checkbox'] : cls.label;

  return (
    <div>
      <label htmlFor={id} className={[...classNames, classes].join(' ')}>
        {type !== InputType.CHECKBOX ? text : ''}
        <input
          ref={input}
          type={type}
          name={name}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          id={id}
          min={min}
          placeholder={placeholder}
          className={[cls.input, ...inputStyles].join(' ')}
        />
        {type === InputType.CHECKBOX ? text : ''}
      </label>
      <div className={cls.error}>{isError ?? ''}</div>
    </div>
  );
};

export default UncontrolledInput;
