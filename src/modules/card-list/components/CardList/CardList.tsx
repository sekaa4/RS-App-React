import Data from 'models/Data.type';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import cls from './CardList.module.scss';

interface CardListState {
  data: Data[] | null;
}

interface CardListProps {
  data?: Data[];
}

const CardList = (props: CardListProps) => {
  const { data: dataProps } = props;
  const [cardListState, setCardListState] = useState<CardListState>({
    data: dataProps ?? null,
  });
  const { data } = cardListState;

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`./Data.json`);
      const dataFetch = data ?? (await res.json());
      const newData = dataProps ?? dataFetch;
      setCardListState((oldState) => ({ ...oldState, data: newData }));
    };
    getData();
  }, [dataProps, data]);

  return cardListState.data ? (
    <div className={cls['card-list']}>
      {cardListState.data.map((dataCharacter: Data) => (
        <Card key={dataCharacter.id} data={dataCharacter} />
      ))}
    </div>
  ) : (
    <div>isLoading...</div>
  );
};

export default CardList;
