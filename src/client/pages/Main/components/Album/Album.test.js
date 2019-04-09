import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Album from './Album';

jest.mock('../../../shared/Image/Image');
afterAll(cleanup);

describe('albums list item component', () => {
  const id = '1234';
  const artists = [{ id: '1', name: 'First Name' }, { id: '2', name: 'Second Name' }];
  const title = 'Album Title';
  const image = {
    large: 'image-large.jpg',
    small: 'image-small.jpg'
  };

  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getAllByTestId, getByTestId, getByText, queryByTestId, rerender } = render(
    <Router history={history}>
      <Album id={id} title={title} artists={artists} image={image} />
    </Router>
  );
  const album = getByTestId('album');

  it('renders album title', () => {
    expect(getByTestId('title').textContent).toBe('Album Title');
  });
  it('renders artists names', () => {
    const names = getAllByTestId('name');
    const firstName = getByText(/First Name/i);
    const secondName = getByText(/Second Name/i);

    expect(names).toHaveLength(2);
    expect(names).toContain(firstName);
    expect(names).toContain(secondName);
  });
  it('renders add button', () => {
    const add = getByTestId('add');
    expect(album).toContainElement(add);
    expect(add).toHaveAttribute('role', 'button');
  });
  it('renders details button', () => {
    const details = getByTestId('details');
    expect(album).toContainElement(details);
    expect(details).toHaveAttribute('role', 'button');
  });
  it('renders album cover', () => {
    const image = getByTestId('image');
    expect(album).toContainElement(image);
  });
  it('does not render cover if image is not available', () => {
    const image = null;
    rerender(
      <Router history={history}>
        <Album id={id} title={title} artists={artists} image={image} />
      </Router>
    );
    expect(queryByTestId('image')).not.toBeInTheDocument();
  });
});
