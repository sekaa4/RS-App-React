import CustomRefObject from 'models/CustomRefObject.type';
import { useEffect, useRef } from 'react';
import cls from './UncontrolledTextArea.module.scss';

interface UncontrolledTextAreaProps {
  classNames?: string[];
  textAreaStyles?: string[];
  id: string;
  name: string;
  text?: string;
  rows?: number;
  cols?: number;
  refObject: CustomRefObject;
  placeholder?: string;
  defaultValue?: string;
  errorObject: Record<keyof CustomRefObject, false | string>;
}
const UncontrolledTextArea = (props: UncontrolledTextAreaProps) => {
  const {
    classNames = '',
    id,
    name,
    text,
    rows = 4,
    cols = 28,
    placeholder = '',
    defaultValue,
    textAreaStyles = [],
    refObject,
    errorObject,
  } = props;
  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    refObject[id] = textArea;
    errorObject[id] = false;
  }, [refObject, errorObject, id]);

  const isError = errorObject[id];

  return (
    <div>
      <label htmlFor={id} className={[...classNames, cls.label].join(' ')}>
        {text}
        <textarea
          ref={textArea}
          name={name}
          defaultValue={defaultValue}
          id={id}
          placeholder={placeholder}
          className={[cls.textarea, ...textAreaStyles].join(' ')}
          rows={rows}
          cols={cols}
        />
      </label>
      <div className={cls.error}>{isError ?? ''}</div>
    </div>
  );
};

export default UncontrolledTextArea;
