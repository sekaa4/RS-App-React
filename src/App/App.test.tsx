import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Data from 'models/Data.type';
import App from './App';
import WrappedApp from './WrappedApp';

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

global.fetch = vi.fn().mockResolvedValueOnce({
  json: () => Promise.resolve(data),
});

describe('App', () => {
  it('Renders <Home Page>', () => {
    render(<WrappedApp />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Home Page');
  });

  it('Renders <Not Found> if invalid path', () => {
    render(
      <MemoryRouter initialEntries={["/this-route-doesn't-exist"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not Found Page');
  });
});
