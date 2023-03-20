import { ChangeEvent, PureComponent } from 'react';
import cls from './Input.module.scss';

interface InputProps {
  classNames?: string[];
  type: string;
  value?: string;
  id: string;
  placeholder?: string;
  inputStyles?: string[];
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export default class Input extends PureComponent<InputProps> {
  render() {
    const {
      classNames = '',
      type = 'text',
      value = '',
      id,
      placeholder = '',
      inputStyles = [],
      handleChange,
    } = this.props;

    return (
      <label htmlFor={id} className={[...classNames].join(' ')}>
        <input
          type={type}
          onChange={handleChange}
          value={value}
          id={id}
          placeholder={placeholder}
          className={[cls.input, ...inputStyles].join(' ')}
        />
      </label>
    );
  }
}
