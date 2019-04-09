import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAlbumInfo } from './album';
import * as actionTypes from '../types';

jest.mock('../helpers/getAlbumData');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

afterEach(() => {
  jest.clearAllMocks();
  store.clearActions();
});

describe('album actions', () => {
  it('should execute fetch album info', () => {
    const requestId = '1';
    const artists = [
      {
        id: '1234',
        name: 'First Artist'
      },
      {
        id: '456y',
        name: 'Secont Artist'
      }
    ];
    const title = 'Album Title';
    const images = [
      {
        id: '1',
        image: 'image.jpg',
        thumbnails: {
          large: 'image-large.jpg',
          small: 'image-small.jpg'
        }
      }
    ];
    const date = '2017-10-20';

    const expectedActions = [
      { type: actionTypes.FETCH_ALBUM_INFO_BEGIN },
      {
        type: actionTypes.FETCH_ALBUM_INFO_SUCCESS,
        id: requestId,
        images,
        artists,
        title,
        date
      }
    ];
    return store.dispatch(fetchAlbumInfo(requestId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed to fetch', () => {
    const requestId = '23';
    const message = 'Album Not Found';

    const expectedActions = [
      { type: actionTypes.FETCH_ALBUM_INFO_BEGIN },
      {
        type: actionTypes.FETCH_ALBUM_INFO_FAILURE,
        message
      }
    ];
    return store.dispatch(fetchAlbumInfo(requestId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
