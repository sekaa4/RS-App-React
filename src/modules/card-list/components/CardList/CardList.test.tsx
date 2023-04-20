import { render, screen } from '@testing-library/react';

import Data from 'models/Data.type';
import CardList from './CardList';

const data: Data[] = [
  {
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

describe('Testing CardList', () => {
  it('should CardList create', async () => {
    render(<CardList data={data} />);
    expect(screen.queryByText(/age:/i)).toBeNull();
    expect(await screen.findAllByRole('img')).toHaveLength(2);
    expect(screen.getAllByText('name:')).toHaveLength(2);
  });
});
