import { PureComponent } from 'react';
import CardList from 'modules/card-list/components/CardList/CardList';
import InputSearch from 'modules/input-search/components/InputSearch/InputSearch';
import { Button } from 'modules/common';
import cls from './Home.module.scss';

export default class Home extends PureComponent {
  render() {
    return (
      <div className={cls.home}>
        <h2>Home Page</h2>
        <div className={cls['home__search-bar']}>
          <InputSearch />
          <Button text="search" />
        </div>
        <CardList />
      </div>
    );
  }
}
