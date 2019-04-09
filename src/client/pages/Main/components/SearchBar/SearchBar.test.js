import React from 'react';
import { render, cleanup } from 'react-testing-library';
import SearchBar from './SearchBar';

afterAll(cleanup);

describe('search bar component', () => {
  const props = {
    isWaiting: false,
    values: { request: 'The Wall' },
    handleChange: () => {},
    handleSubmit: () => {}
  };

  const { getByTestId, queryByTestId, getByPlaceholderText } = render(<SearchBar {...props} />);
  it('renders input component', () => {
    const input = getByPlaceholderText(/Find Album/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual(props.values.request);
  });
  it('renders submit button', () => {
    const submit = getByTestId('submit');
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveAttribute('role', 'button');
  });
});
