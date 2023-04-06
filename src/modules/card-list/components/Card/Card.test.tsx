import { render, screen } from '@testing-library/react';
import Data from 'models/Data.type';
import { describe, it } from 'vitest';

import Card from './Card';

describe('Testing Card', () => {
  it('should Card create', () => {
    const mockData: Data = {
      userId: 1,
      id: 1,
      name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
      birthDate: '2018-03-09',
      age: 5,
      gender: 'male',
      breeds: 'Aegean',
      img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
    };

    render(<Card data={mockData} />);
    expect(screen.getByText(/Aegean/)).toBeInTheDocument();
    expect(screen.getByText(/age:/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
