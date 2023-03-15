import Data from 'models/Data.type';
import { Component } from 'react';
import Card from '../Card/Card';

interface CardListState {
  data: Data[] | null;
}

async function getData() {
  const res = await fetch(`./Data.json`);
  const data = await res.json();
  return data;
}

export default class CardList extends Component<Record<string, never>, CardListState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      const data = await getData();
      this.setState({ data });
    }, 2000);
  }

  render() {
    const { data } = this.state;
    return data ? (
      <div>
        {data.map((dataCharacter: Data) => (
          <Card key={dataCharacter.id} data={dataCharacter} />
        ))}
      </div>
    ) : (
      <div>isLoading...</div>
    );
  }
}
