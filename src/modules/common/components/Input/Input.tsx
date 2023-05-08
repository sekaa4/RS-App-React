import { ChangeEvent } from 'react';
import cls from './Input.module.scss';

interface InputProps {
  classNames?: string[];
  type?: string;
  value?: string;
  id: string;
  placeholder?: string;
  inputStyles?: string[];
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Input = (props: InputProps) => {
  const {
    id,
    classNames = '',
    type = 'text',
    value = '',
    placeholder,
    inputStyles = [],
    handleChange,
    handleKeyDown,
  } = props;

  return (
    <label htmlFor={id} className={[...classNames].join(' ')}>
      <input
        id={id}
        type={type}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder={placeholder}
        className={[cls.input, ...inputStyles].join(' ')}
      />
    </label>
  );
};

export default Input;
