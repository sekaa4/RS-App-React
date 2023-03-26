import CustomRefObject from 'models/CustomRefObject.type';
import { Component, createRef } from 'react';
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
export default class UncontrolledInput extends Component<UncontrolledInputProps> {
  input: React.RefObject<HTMLInputElement>;

  constructor(props: UncontrolledInputProps) {
    super(props);
    const { refObject, errorObject, id } = this.props;
    this.input = createRef<HTMLInputElement>();

    refObject[id] = this.input;
    errorObject[id] = false;
  }

  render() {
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
      errorObject,
    } = this.props;

    const isError = errorObject[id];
    const classes = type === 'checkbox' ? cls['label-checkbox'] : cls.label;

    return (
      <div>
        <label htmlFor={id} className={[...classNames, classes].join(' ')}>
          {type !== 'checkbox' ? text : ''}
          <input
            ref={this.input}
            type={type}
            name={name}
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            id={id}
            min={min}
            placeholder={placeholder}
            className={[cls.input, ...inputStyles].join(' ')}
          />
          {type === 'checkbox' ? text : ''}
        </label>
        <div className={cls.error}>{isError ?? ''}</div>
      </div>
    );
  }
}
