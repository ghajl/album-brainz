import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AlbumItem from './AlbumItem';

jest.mock('../../../shared/Image/Image');
afterAll(cleanup);

describe('list item', () => {
  const id = '1234';
  const artist = [{ id: '1', name: 'First Name' }, { id: '2', name: 'Second Name' }];
  const title = 'Album Title';
  const image = 'image.jpg';

  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getAllByTestId, getByTestId, getByText } = render(
    <Router history={history}>
      <AlbumItem id={id} title={title} artist={artist} image={image} />
    </Router>
  );

  const album = getByTestId('album');
  it('renders album cover', () => {
    const image = getByTestId('image');
    expect(album).toContainElement(image);
    expect(image).toHaveAttribute('src', 'image.jpg');
  });
  it('renders album title', () => {
    expect(getByTestId('title').textContent).toBe('Album Title');
  });
  it('renders artists names', () => {
    const artists = getByTestId('artists');
    const name = getByTestId('name');
    const names = getAllByTestId('name');
    const firstName = getByText(/First Name/i);
    const secondName = getByText(/Second Name/i);

    expect(artists).toContainElement(name);
    expect(names).toHaveLength(2);
    expect(names).toContain(firstName);
    expect(names).toContain(secondName);
  });
  it('renders button remove', () => {
    const remove = getByTestId('remove');
    expect(album).toContainElement(remove);
    expect(remove).toHaveAttribute('role', 'button');
  });
  it('renders button details', () => {
    const details = getByTestId('details');
    expect(album).toContainElement(details);
    expect(details).toHaveAttribute('role', 'button');
  });
});
