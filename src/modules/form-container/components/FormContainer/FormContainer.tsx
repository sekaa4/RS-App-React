import Data from 'models/Data.type';
import CardList from 'modules/card-list/components/CardList/CardList';
import { Component } from 'react';
import { Form } from 'modules/common/index';
import cls from './FormContainer.module.scss';

interface FormContainerState {
  dataCard: Data[] | null;
}

const data: Data[] = [
  {
    userId: 1,
    id: 1,
    name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    birthDate: '2018-03-09',
    age: 5,
    gender: 'male',
    breeds: 'Aegean',
    img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
  },
  {
    userId: 2,
    id: 2,
    name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    birthDate: '2018-03-09',
    age: 5,
    gender: 'male',
    breeds: 'Aegean',
    img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
  },
];

export default class FormContainer extends Component<Record<string, unknown>, FormContainerState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      dataCard: data,
    };
    this.createCardFromForm = this.createCardFromForm.bind(this);
  }

  createCardFromForm(event: React.MouseEvent<SubmitEvent>, dataObj: Data) {
    this.setState((oldState) => {
      const { dataCard } = oldState;
      if (dataCard) {
        dataCard.push(dataObj);
        return { dataCard };
      }
      const newArrData = [dataObj];
      return { dataCard: newArrData };
    });
  }

  render() {
    const { dataCard } = this.state;

    return (
      <div className={cls['form-container']}>
        <Form />
        {dataCard ? <CardList data={dataCard} /> : <CardList />}
      </div>
    );
  }
}
