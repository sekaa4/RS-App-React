import { PureComponent } from 'react';
import CardList from 'modules/card-list/components/CardList/CardList';
import { Button, Input } from 'modules/common';
import cls from './Home.module.scss';

export default class Home extends PureComponent {
  render() {
    const styles = [cls['search-bar']];
    return (
      <div className={cls.home}>
        <h2>Home Page</h2>
        <div className={cls['home__search-bar']}>
          <Input classNames={styles} />
          <Button />
        </div>
        <CardList />
      </div>
    );
  }
}
