import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Data from 'models/Data.type';
import { vi } from 'vitest';

import FormContainer from './FormContainer';

const data: Data[] = [
  {
    id: 1,
    name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    birthDate: '2018-03-09',
    age: 5,
    gender: 'male',
    breeds: 'Aegean',
    img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
  },
  {
    id: 2,
    name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    birthDate: '2018-03-09',
    age: 5,
    gender: 'male',
    breeds: 'Aegean',
    img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
  },
];

global.fetch = vi.fn().mockResolvedValueOnce({
  json: () => Promise.resolve(data),
});

beforeEach(() => {
  cleanup();
  render(<FormContainer />);
});

describe('Testing FormContainer created', () => {
  it('should render text "Cards not found..." when FormContainer component rendering first time', () => {
    expect(screen.getByText(/Cards not found, please fill the form and create card/i)).toBeTruthy();
  });

  it('should create two input with type radio', () => {
    const radioArr = screen.queryAllByRole('radio');
    expect(radioArr.length).toBe(2);
  });
});

describe('Testing FormContainer with Error message', () => {
  it('should create submit button', () => {
    const submit = screen.getByRole('button');
    expect(submit).toBeTruthy();
  });

  it('should render Error message', async () => {
    expect(screen.queryByText(/ERROR: Choose breeds of your cat/i)).toBeFalsy();
    const submit = screen.getByRole('button');
    await userEvent.click(submit);
    expect(screen.getByText(/ERROR: Choose breeds of your cat/i)).toBeTruthy();
  });

  it('should render eight errors message', async () => {
    const submit = screen.getByRole('button');
    await userEvent.click(submit);
    const countErrors = screen.getAllByText(/ERROR:/i).length;
    expect(countErrors).toBe(8);
  });
});

describe('Test Creating Card', () => {
  const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
  window.URL.createObjectURL = vi.fn().mockReturnValue('http://fakeURL/hello.png');

  it('should create card', async () => {
    const fieldName = screen.getByLabelText(/Enter the name of your cat:/i);
    const fieldDate = screen.getByLabelText(/Choose the birthday date of your cat:/i);
    const fieldAge = screen.getByLabelText(/Enter the age of your cat\(year\):/i);
    const fieldRadioFemale = screen.getByLabelText(/female/i);
    const fieldDescription = screen.getByLabelText(/Enter description of your cat:/i);
    const fieldBreeds = screen.getByLabelText(/Choose breeds of your cat:/i);
    const fieldImage = screen.getByLabelText(/Choose your cat image:/i);
    const fieldConsent = screen.getByLabelText(/I consent to my personal data/i);
    const submit = screen.getByRole('button');

    const fields = [
      fieldName,
      fieldDate,
      fieldAge,
      fieldRadioFemale,
      fieldDescription,
      fieldBreeds,
      fieldImage,
      fieldConsent,
      submit,
    ];

    fields.forEach((field) => {
      expect(field).toBeTruthy();
    });

    expect(screen.queryByRole('img')).toBeNull();

    await userEvent.type(fieldName, 'John');
    expect(screen.findByText(/John/i)).toBeTruthy();

    await userEvent.type(fieldDate, '2023-03-26');
    expect(fieldDate).toHaveValue('2023-03-26');

    await userEvent.type(fieldAge, '2');
    expect(fieldAge).toHaveValue(2);

    await userEvent.click(fieldRadioFemale);
    expect(fieldRadioFemale).toBeChecked();

    await userEvent.type(fieldDescription, 'Description');
    expect(screen.findByText(/Description/i)).toBeTruthy();

    await userEvent.selectOptions(fieldBreeds, 'Asian');
    expect(fieldBreeds).toHaveValue('Asian');

    await userEvent.upload(fieldImage, fakeFile);
    expect(screen.findByText(/hello.png/i)).toBeTruthy();

    await userEvent.click(fieldConsent);
    expect(fieldConsent).toBeChecked();

    await userEvent.click(submit);
    const countErrors = screen.queryAllByText(/ERROR:/i).length;
    expect(countErrors).toBe(0);

    expect(screen.getByRole('img')).toBeTruthy();

    await userEvent.click(submit);
    expect(screen.getAllByRole('img').length).toBe(1);
    expect(URL.createObjectURL).toBeCalledTimes(1);
    expect(fieldRadioFemale).not.toBeChecked();
  });
});
