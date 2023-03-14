import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import WrappedApp from './WrappedApp';

describe('App', () => {
  it('Renders <Home Page>', () => {
    // arrange
    render(<WrappedApp />);

    // act

    // expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Home Page');
  });

  it('Renders <Not Found> if invalid path', () => {
    // arrange
    render(
      <MemoryRouter initialEntries={["/this-route-doesn't-exist"]}>
        <App />
      </MemoryRouter>
    );

    // expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not Found Page');
  });
});
