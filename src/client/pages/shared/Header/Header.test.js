import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from './Header';

jest.mock('./MyAlbumsBadgeContainer');
afterAll(cleanup);

describe('header component', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getAllByTestId, getByTestId, getByText } = render(
    <Router history={history}>
      <Header />
    </Router>
  );
  const header = getByTestId('header');
  it('renders brand', () => {
    expect(header).toContainElement(getByTestId('brand'));
  });
  it('renders My Albums link', () => {
    expect(header).toContainElement(getByTestId('myAlbums'));
  });
  it('renders My Albums badge', () => {
    expect(header).toContainElement(getByTestId('badge'));
  });
  it('renders Find link', () => {
    expect(header).toContainElement(getByTestId('find'));
  });
});
