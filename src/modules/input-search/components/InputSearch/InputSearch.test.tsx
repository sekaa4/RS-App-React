import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import InputSearch from './InputSearch';

let mockLocalStorage: Record<string, string>;

beforeEach(() => {
  mockLocalStorage = {};
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
    mockLocalStorage[key] = `${value}`;
  });
});

describe('Testing Input', () => {
  it('should change value Input', async () => {
    render(<InputSearch />);
    expect(screen.getByRole('textbox')).toHaveDisplayValue('');
    await userEvent.type(screen.getByRole('textbox'), 'React');
    expect(screen.getByRole('textbox')).toHaveDisplayValue('React');
  });

  it('should save in LocalStorage', async () => {
    const { unmount } = render(<InputSearch />);
    await userEvent.type(screen.getByRole('textbox'), 'React');
    unmount();
    expect(screen.queryByRole('textbox')).toBeFalsy();
    expect(Object.hasOwn(mockLocalStorage, 'key')).toBeTruthy();
  });
});
