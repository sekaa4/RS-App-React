import Data from 'models/Data.type';
import Card from '../Card/Card';
import cls from './CardList.module.scss';

interface CardListProps {
  data: Data[] | null;
}

const CardList = (props: CardListProps) => {
  const { data } = props;

  return data && data.length !== 0 ? (
    <div className={cls['card-list']}>
      {data.map((dataCharacter: Data) => (
        <Card key={dataCharacter.id} data={dataCharacter} />
      ))}
    </div>
  ) : (
    <div>Search not found</div>
  );
};

export default CardList;
