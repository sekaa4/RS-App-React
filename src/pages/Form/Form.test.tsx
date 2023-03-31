import { render, screen } from '@testing-library/react';

import { Form } from 'pages';

describe('Testing Form Page', () => {
  it('should render Form', () => {
    render(<Form />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Form Page/i);
  });
});
