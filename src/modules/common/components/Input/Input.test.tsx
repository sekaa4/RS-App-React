import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Testing Input component', () => {
  it('Input component should get props and rendering with them', () => {
    render(<Input id="input" type="text" />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
