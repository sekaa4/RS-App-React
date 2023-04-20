import { screen } from '@testing-library/react';

import { Form } from 'pages';
import renderWithProviders from 'utils/testUtils';

describe('Testing Form Page', () => {
  it('should render Form', () => {
    renderWithProviders(<Form />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Form Page/i);
  });
});
