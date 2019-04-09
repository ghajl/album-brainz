import React from 'react';
import { render, cleanup } from 'react-testing-library';
import AlbumDetails from './AlbumDetails';
jest.mock('../../../shared/Image/Image');
afterAll(cleanup);

describe('album details component', () => {
  const props = {
    id: '1234',
    img: 'image.jpg',
    artists: [{ id: '1', name: 'First Name' }, { id: '2', name: 'Second Name' }],
    title: 'Album Title',
    date: '2016-12-17'
  };
  const { getByTestId } = render(<AlbumDetails {...props} />);
  const details = getByTestId('details');
  it('renders album cover', () => {
    const image = getByTestId('image');
    expect(details).toContainElement(image);
  });
  it('renders album info', () => {
    const info = getByTestId('info');
    expect(details).toContainElement(info);
  });
});
