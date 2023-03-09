import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WrappedApp, App } from './App';

describe('App', () => {
  it('Renders hello world', () => {
    // arrange
    render(<WrappedApp />);

    // act

    // expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World'
    );
  });

  it('Renders not found if invalid path', () => {
    // arrange
    render(
      <MemoryRouter initialEntries={["/this-route-doesn't-exist"]}>
        <App />
      </MemoryRouter>
    );

    // expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'It is 404 page'
    );
  });
});
