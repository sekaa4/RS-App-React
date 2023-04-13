import { render, screen } from '@testing-library/react';
import Data from 'models/Data.type';
import { describe, it, vi } from 'vitest';

import Modal from './Modal';

const mockData: Data[] = [
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
];

describe('Testing Modal', () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    json: () => Promise.resolve(mockData),
  });
  it('should Module create', async () => {
    const modalData = { isModal: true, isLoading: true, id: 1 };

    render(<Modal modalData={modalData} />);
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByText(/Aegean/)).toBeInTheDocument();
    expect(screen.getByText(/age:/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
