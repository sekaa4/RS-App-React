import CardList from 'modules/card-list/components/CardList/CardList';
import InputSearch from 'modules/input-search/components/InputSearch/InputSearch';
import { Button } from 'modules/common';
import { useState, useEffect, useRef } from 'react';
import Data from 'models/Data.type';
import URLConstants from 'models/URLConstants';
import cls from './Home.module.scss';

interface CardListState {
  data: Data[] | null;
}

const Home = () => {
  const [cardListState, setCardListState] = useState<CardListState>({
    data: null,
  });
  const [searchSubmit, setSearchSubmit] = useState<string>(localStorage.getItem('key') ?? '');
  const [isLoading, setLoading] = useState<boolean>(true);

  const refSearchValue = useRef<string>(localStorage.getItem('key') ?? '');

  const handleClick = () => {
    setSearchSubmit(refSearchValue.current);
    setLoading(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${URLConstants.BASE_URL}?q=${searchSubmit}`);
        const newData = await res.json();
        setCardListState((oldState) => ({ ...oldState, data: newData }));
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchSubmit]);

  return (
    <div className={cls.home}>
      <h2>Home Page</h2>
      <div className={cls['home__search-bar']}>
        <InputSearch refSearchValue={refSearchValue} />
        <Button text="search" handleClick={handleClick} />
      </div>
      {isLoading ? <div>Loading...</div> : <CardList data={cardListState.data} />}
    </div>
  );
};

export default Home;
