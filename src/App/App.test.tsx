import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from 'utils/testUtils';
import App from './App';
import WrappedApp from './WrappedApp';

describe('App', () => {
  it('Renders <Home Page>', () => {
    renderWithProviders(<WrappedApp />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Home Page');
  });

  it('Renders <Not Found> if invalid path', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/this-route-doesn't-exist"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not Found Page');
  });
});
