import CustomRefObject from 'models/CustomRefObject.type';
import { Component, createRef } from 'react';
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
export default class UncontrolledTextArea extends Component<UncontrolledTextAreaProps> {
  textArea: React.RefObject<HTMLTextAreaElement>;

  constructor(props: UncontrolledTextAreaProps) {
    super(props);
    const { refObject, errorObject, id } = this.props;
    this.textArea = createRef<HTMLTextAreaElement>();

    refObject[id] = this.textArea;
    errorObject[id] = false;
  }

  render() {
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
      errorObject,
    } = this.props;

    const isError = errorObject[id];

    return (
      <div>
        <label htmlFor={id} className={[...classNames].join(' ')}>
          {text}{' '}
          <textarea
            ref={this.textArea}
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
  }
}
