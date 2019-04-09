import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Albums from './Albums';

jest.mock('../Album/AlbumContainer.js');
afterAll(cleanup);

describe('albums component', () => {
  let props = [
    {
      id: '1234'
    },
    {
      id: '23d45'
    }
  ];
  const { getAllByTestId, getByTestId, getByText, queryByTestId, rerender } = render(
    <Albums albums={props} />
  );

  it('renders album components', () => {
    const albums = queryByTestId('albums');
    const firstAlbum = getByTestId(props[0].id);
    const secondAlbum = getByTestId(props[1].id);
    expect(albums).toContainElement(firstAlbum);
    expect(albums).toContainElement(secondAlbum);
  });
  it('does not render album components if list is empty', () => {
    props = [];
    rerender(<Albums albums={props} />);
    const albums = queryByTestId('albums');
    expect(albums).not.toBeInTheDocument();
  });
});
