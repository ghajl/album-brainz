import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actionTypes from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.clearAllMocks();
  store.clearActions();
});

describe('album actions', () => {
  it('should execute fetch albums', () => {
    jest.doMock('../helpers/getAlbums');
    const { fetchAlbums } = require('./albums');
    const keyword = 'nevermind';
    const albums = [
      {
        id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
        images: [],
        artists: [
          {
            id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
            name: 'Victor Ruiz'
          }
        ],
        title: 'Nevermind',
        date: ''
      },
      {
        id: '1b022e01-4da6-387b-8658-8678046e4cef',
        images: [
          {
            id: '1',
            image: 'image.jpg',
            thumbnails: {
              large: 'image-large.jpg',
              small: 'image-small.jpg'
            }
          }
        ],
        artists: [
          {
            id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
            name: 'Nirvana'
          }
        ],
        title: 'Nevermind',
        date: ''
      }
    ];

    const expectedActions = [
      { type: actionTypes.FETCH_ALBUMS_BEGIN },
      {
        type: actionTypes.FETCH_ALBUMS_SUCCESS,
        albums
      }
    ];
    return store.dispatch(fetchAlbums(keyword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an empty list', () => {
    const keyword = 'fsdf234';
    const albums = [];

    jest.doMock('../helpers/getAlbums');
    const { fetchAlbums } = require('./albums');
    const expectedActions = [
      { type: actionTypes.FETCH_ALBUMS_BEGIN },
      {
        type: actionTypes.FETCH_ALBUMS_SUCCESS,
        albums
      }
    ];
    return store.dispatch(fetchAlbums(keyword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed to fetch', () => {
    const keyword = 'nevermind';
    const message = 'Unable to show results';

    jest.doMock('../helpers/getAlbums', () => {
      return jest.fn(() => {
        throw new Error();
      });
    });
    const { fetchAlbums } = require('./albums');

    const expectedActions = [
      { type: actionTypes.FETCH_ALBUMS_BEGIN },
      {
        type: actionTypes.FETCH_ALBUMS_FAILURE,
        message
      }
    ];
    return store.dispatch(fetchAlbums(keyword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
