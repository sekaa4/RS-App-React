import Data from 'models/Data.type';
import { Component } from 'react';
import Card from '../Card/Card';
import cls from './CardList.module.scss';

interface CardListState {
  data: Data[] | null;
}

interface CardListProps {
  data?: Data[];
}

async function getData() {
  const res = await fetch(`./Data.json`);
  const data = await res.json();
  return data;
}

export default class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);

    const { data } = this.props;
    this.state = {
      data: data ?? null,
    };
  }

  async componentDidMount() {
    const { data: curData } = this.state;
    const data = curData ?? (await getData());
    this.setState({ data });
  }

  render() {
    const { data: curData } = this.props;
    const { data } = this.state;
    const renderData = curData ?? data;

    return renderData ? (
      <div className={cls['card-list']}>
        {renderData.map((dataCharacter: Data) => (
          <Card key={dataCharacter.id} data={dataCharacter} />
        ))}
      </div>
    ) : (
      <div>isLoading...</div>
    );
  }
}
