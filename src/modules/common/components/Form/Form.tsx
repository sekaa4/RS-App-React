import { PureComponent } from 'react';
import cls from './Form.module.scss';

export default class Form extends PureComponent<Record<string, unknown>> {
  render() {
    return (
      <fieldset>
        <form />
      </fieldset>
    );
  }
}
