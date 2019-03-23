import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MyAlbums from './MyAlbums';
jest.mock('../../../../data/helpers/getCoverData');
jest.mock('../../../../data/helpers/getAlbumData');
jest.mock('../../../shared/Image/Image');
afterAll(cleanup);

describe('album info component', () => {
  const albums = [
    {
      id: '1234',
      artist: [{ id: '1', name: 'First Name' }, { id: '2', name: 'Second Name' }],
      title: 'Album Title',
      image: 'image.jpg'
    },
    {
      id: '23d45',
      artist: [{ id: '1', name: 'First Name' }, { id: '2', name: 'Second Name' }],
      title: 'Album Title',
      image: 'image.jpg'
    }
  ];
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const store = createStore(() => {});
  const { getAllByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <MyAlbums albums={albums} />
      </Router>
    </Provider>
  );
  it('renders albums list', () => {
    expect(getAllByTestId('item')).toHaveLength(2);
  });
});
