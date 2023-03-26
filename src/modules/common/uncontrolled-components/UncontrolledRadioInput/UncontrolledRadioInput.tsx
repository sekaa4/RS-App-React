import CustomRefObject from 'models/CustomRefObject.type';
import { Component, createRef } from 'react';
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
export default class UncontrolledRadioInput extends Component<UncontrolledRadioInputProps> {
  radioInput: React.RefObject<HTMLInputElement>;

  constructor(props: UncontrolledRadioInputProps) {
    super(props);
    const { refObject, errorObject, name } = this.props;
    this.radioInput = createRef<HTMLInputElement>();

    refObject.push(this.radioInput);
    errorObject[name] = false;
  }

  render() {
    const { classNames = '', id, name, inputStyles = [], defaultValue } = this.props;

    return (
      <label htmlFor={id} className={[...classNames, cls['radio-label']].join(' ')}>
        {defaultValue}
        <input
          ref={this.radioInput}
          type="radio"
          name={name}
          id={id}
          defaultValue={defaultValue}
          className={[cls['radio-input'], ...inputStyles].join(' ')}
        />
      </label>
    );
  }
}
