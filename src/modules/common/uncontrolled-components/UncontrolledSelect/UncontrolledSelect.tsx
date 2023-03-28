import CustomRefObject from 'models/CustomRefObject.type';
import { useRef } from 'react';
import cls from './UncontrolledSelect.module.scss';

interface UncontrolledSelectProps {
  classNames?: string[];
  id: string;
  name: string;
  text?: string;
  refObject: CustomRefObject;
  errorObject: Record<keyof CustomRefObject, false | string>;
  options: string[];
}
const UncontrolledTextArea = (props: UncontrolledSelectProps) => {
  const { classNames = '', id, name, text, options, refObject, errorObject } = props;
  const select = useRef<HTMLSelectElement>(null);

  const isError = errorObject[id] ?? false;
  refObject[id] = select;

  return (
    <div>
      <label htmlFor={id} className={cls['label-select']}>
        {text}
        <select id={id} name={name} ref={select} className={[...classNames, cls.select].join(' ')}>
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
      <div className={cls.error}>{isError ?? ''}</div>
    </div>
  );
};

export default UncontrolledTextArea;
