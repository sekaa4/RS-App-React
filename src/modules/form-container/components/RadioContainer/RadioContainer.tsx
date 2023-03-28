import CustomRefObject from 'models/CustomRefObject.type';
import { PropsWithChildren } from 'react';
import cls from './RadioContainer.module.scss';

interface RadioContainerProps {
  errorObject: Record<keyof CustomRefObject, false | string>;
  name: string;
}
const RadioContainer = (props: PropsWithChildren<RadioContainerProps>) => {
  const { children, errorObject, name } = props;
  const isError = errorObject[name];

  return (
    <fieldset className={cls.fieldset}>
      <legend>Choose Gender of your Cat</legend>
      <div className={cls['radio-group']}>{children}</div>
      <div className={cls.error}>{isError ?? ''}</div>
    </fieldset>
  );
};

export default RadioContainer;
