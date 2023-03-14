import { Button, Input } from 'modules/common';
import { PureComponent } from 'react';

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <Input />
        <Button />
      </div>
    );
  }
}
