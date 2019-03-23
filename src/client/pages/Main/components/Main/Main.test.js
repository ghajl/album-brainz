import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Main from './Main';
jest.mock('../SearchBar/SearchBarContainer');
jest.mock('../Albums/AlbumsContainer');

afterAll(cleanup);

describe('main component', () => {
  let isWaiting = false;

  const { getByTestId, queryByTestId, rerender } = render(<Main isWaiting={isWaiting} />);
  const main = getByTestId('main');
  it('renders albums list', () => {
    const albums = getByTestId('albums');
    expect(main).toContainElement(albums);
  });
  it('renders search bar', () => {
    const searchbar = getByTestId('searchbar');
    expect(main).toContainElement(searchbar);
  });
  it('does not render loading element when isWaiting is false', () => {
    expect(queryByTestId('loading')).not.toBeInTheDocument();
  });
  it('does render loading element when isWaiting is true', () => {
    isWaiting = true;
    rerender(<Main isWaiting={isWaiting} />);
    expect(queryByTestId('loading')).toBeInTheDocument();
  });
});
