import CustomRefObject from 'models/CustomRefObject.type';
import { PropsWithChildren, PureComponent } from 'react';
import cls from './RadioContainer.module.scss';

interface RadioContainerProps {
  errorObject: Record<keyof CustomRefObject, false | string>;
  name: string;
}
export default class RadioContainer extends PureComponent<PropsWithChildren<RadioContainerProps>> {
  render() {
    const { children, errorObject, name } = this.props;
    const isError = errorObject[name];

    return (
      <fieldset className={cls.fieldset}>
        <legend>Choose Gender of your Cat</legend>
        {children}
        <div className={cls.error}>{isError ?? ''}</div>
      </fieldset>
    );
  }
}
