import '@babel/polyfill';
import getAlbumData from './getAlbumData';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
jest.mock('./getCoverData');
const mock = new MockAdapter(axios);
afterEach(() => {
  mock.reset();
  jest.clearAllMocks();
});

describe('getAlbumData should get data from the server and return object that contains release \
 group id, image data, album title, artists names and release date', () => {
  it('should return object that contains album information', () => {
    const requestId = '1';
    const data = {
      id: '1',
      'artist-credit': [
        {
          artist: {
            id: '1234',
            name: 'First Artist'
          }
        },
        {
          artist: {
            id: '456y',
            name: 'Secont Artist'
          }
        }
      ],
      'first-release-date': '2017-10-20',
      releases: [
        {
          id: '1'
        },
        {
          id: '2'
        }
      ],
      title: 'Album Title'
    };

    const result = {
      id: '1',
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
          id: '1234',
          name: 'First Artist'
        },
        {
          id: '456y',
          name: 'Secont Artist'
        }
      ],
      title: 'Album Title',
      date: '2017-10-20'
    };

    mock
      .onGet(`http://musicbrainz.org/ws/2/release-group/${requestId}`, {
        params: { inc: 'artist-credits+releases', fmt: 'json' }
      })
      .reply(200, data);

    return getAlbumData(requestId).then(res => expect(res).toEqual(result));
  });

  it('should return object that contains album information when no cover available', () => {
    const requestId = '1';
    const data = {
      id: '1',
      'artist-credit': [
        {
          artist: {
            id: '1234',
            name: 'First Artist'
          }
        },
        {
          artist: {
            id: '456y',
            name: 'Secont Artist'
          }
        }
      ],
      'first-release-date': '2017-10-20',
      releases: [
        {
          id: '56'
        }
      ],
      title: 'Album Title'
    };

    const result = {
      id: '1',
      images: [],
      artists: [
        {
          id: '1234',
          name: 'First Artist'
        },
        {
          id: '456y',
          name: 'Secont Artist'
        }
      ],
      title: 'Album Title',
      date: '2017-10-20'
    };

    mock
      .onGet(`http://musicbrainz.org/ws/2/release-group/${requestId}`, {
        params: { inc: 'artist-credits+releases', fmt: 'json' }
      })
      .reply(200, data);

    return getAlbumData(requestId).then(res => expect(res).toEqual(result));
  });

  it('should return an empty object if album does not exist', () => {
    const requestId = '1';
    mock.onGet(`http://musicbrainz.org/ws/2/release-group/${requestId}`).reply(404);
    return getAlbumData(requestId).then(res => expect(res).toEqual({}));
  });
});
