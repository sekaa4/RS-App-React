import CustomRefObject from 'models/CustomRefObject.type';
import { createRef, PureComponent } from 'react';
import cls from './UncontrolledInput.module.scss';

interface UncontrolledInputProps {
  classNames?: string[];
  type: string;
  id: string;
  refer?: CustomRefObject;
  name?: string;
  text?: string;
  placeholder?: string;
  inputStyles?: string[];
  defaultValue?: string;
  defaultChecked?: boolean;
}
export default class Input extends PureComponent<UncontrolledInputProps> {
  input: React.RefObject<HTMLInputElement>;

  constructor(props: UncontrolledInputProps) {
    super(props);
    this.input = createRef<HTMLInputElement>();
  }

  render() {
    const {
      classNames = '',
      type = 'text',
      id,
      name,
      placeholder = '',
      defaultValue,
      defaultChecked,
      inputStyles = [],
      text = '',
      refer,
    } = this.props;

    if (refer) {
      refer[id] = this.input;
    }

    return (
      <label htmlFor={id} className={[...classNames].join(' ')}>
        {text}
        <input
          ref={this.input}
          type={type}
          name={name}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          id={id}
          placeholder={placeholder}
          className={[cls.input, ...inputStyles].join(' ')}
        />
      </label>
    );
  }
}
