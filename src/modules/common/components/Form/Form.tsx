import CustomRefObject from 'models/CustomRefObject.type';
import { createRef, PropsWithChildren, PureComponent } from 'react';
import cls from './Form.module.scss';

interface FormProps {
  refer?: CustomRefObject;
  submitHandler?: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default class Form extends PureComponent<PropsWithChildren<FormProps>> {
  form: React.RefObject<HTMLFormElement>;

  constructor(props: PropsWithChildren<FormProps>) {
    super(props);
    this.form = createRef<HTMLFormElement>();
  }

  render() {
    const { children, refer, submitHandler } = this.props;
    if (refer) {
      refer.form = this.form;
    }

    return (
      <form
        ref={this.form}
        onSubmit={(event) => {
          submitHandler?.(event);
        }}
      >
        <fieldset>
          <legend>Description</legend>
          {children}
        </fieldset>
      </form>
    );
  }
}
