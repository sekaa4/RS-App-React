import { render, screen } from '@testing-library/react';
import InputType from 'models/InputType';
import Input from './Input';

describe('Testing Input component', () => {
  it('Input component should get props and rendering with them', () => {
    render(<Input id="input" type={InputType.TEXT} />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
