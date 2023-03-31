import CustomRefObject from 'models/CustomRefObject.type';
import { Component, createRef } from 'react';
import cls from './UncontrolledSelect.module.scss';

interface UncontrolledSelectProps {
  classNames?: string[];
  textAreaStyles?: string[];
  id: string;
  name: string;
  text?: string;
  refObject: CustomRefObject;
  defaultValue?: string;
  errorObject: Record<keyof CustomRefObject, false | string>;
  options: string[];
}
export default class UncontrolledTextArea extends Component<UncontrolledSelectProps> {
  select: React.RefObject<HTMLSelectElement>;

  constructor(props: UncontrolledSelectProps) {
    super(props);
    const { refObject, errorObject, id } = this.props;
    this.select = createRef<HTMLSelectElement>();

    refObject[id] = this.select;
    errorObject[id] = false;
  }

  render() {
    const { classNames = '', id, name, text, options, errorObject } = this.props;

    const isError = errorObject[id];

    return (
      <div>
        <label htmlFor={id} className={cls['label-select']}>
          {text}
          <select
            id={id}
            name={name}
            ref={this.select}
            className={[...classNames, cls.select].join(' ')}
          >
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
  }
}
