import CardList from 'modules/card-list/components/CardList/CaradList';
import { Button, Input } from 'modules/common';
import { PureComponent } from 'react';

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <Input />
        <Button />
        <CardList />
      </div>
    );
  }
}
