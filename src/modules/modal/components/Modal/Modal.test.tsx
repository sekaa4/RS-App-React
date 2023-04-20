import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/testUtils';
import { describe, it } from 'vitest';

import Modal from './Modal';

describe('Testing Modal', () => {
  it('should Module create', async () => {
    const modalData = { isModal: true, isLoading: true, id: 1 };

    renderWithProviders(<Modal modalData={modalData} />);
    expect(await screen.findByText(/Aegean/)).toBeInTheDocument();
    expect(screen.getByText(/age:/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
