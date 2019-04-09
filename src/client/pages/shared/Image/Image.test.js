import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Image from './Image';
jest.mock('react-lazy-load-image-component/src/effects/opacity.css');
jest.mock('react-lazy-load-image-component', () => ({
  __esModule: true,
  LazyLoadImage: jest.fn(({ src, afterLoad }) => {
    return <img src={src} data-testid="image" onLoad={afterLoad} />;
  })
}));
afterAll(cleanup);

describe('image component', () => {
  const image = 'image.jpg';
  const { getByTestId, queryByTestId } = render(<Image src={image} />);
  it('renders image', () => {
    const imageElement = getByTestId('image');
    expect(imageElement).toBeInTheDocument();
  });
  it('renders loading element before the image is loaded', () => {
    expect(queryByTestId('loading')).toBeInTheDocument();
  });
  it('does not render loading element when the image is loaded', () => {
    fireEvent.load(getByTestId('image'));
    expect(queryByTestId('loading')).not.toBeInTheDocument();
  });
});
