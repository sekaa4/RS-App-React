import { render, screen } from '@testing-library/react';

import { About } from 'pages';

describe('Testing About Page', () => {
  it('should render Form', () => {
    render(<About />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/About Page/i);
  });
});
