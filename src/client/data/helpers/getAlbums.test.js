import '@babel/polyfill';
import getAlbums from './getAlbums';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
jest.mock('./getCoverData');
const mock = new MockAdapter(axios);
afterEach(() => {
  mock.reset();
  jest.clearAllMocks();
});

describe('getAlbums should get data from the server', () => {
  it('should return list of objects that contain album information', () => {
    const keyword = 'nevermind';
    const data = {
      'release-groups': [
        {
          id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
          'artist-credit': [
            {
              artist: {
                id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
                name: 'Victor Ruiz'
              }
            }
          ],

          releases: [
            {
              id: '56'
            }
          ],
          title: 'Nevermind'
        },
        {
          id: '1b022e01-4da6-387b-8658-8678046e4cef',
          'artist-credit': [
            {
              artist: {
                id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
                name: 'Nirvana'
              }
            }
          ],

          releases: [
            {
              id: '1'
            },
            {
              id: '2'
            }
          ],
          title: 'Nevermind'
        }
      ]
    };

    const result = [
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
              small: 'image-small.jpg',
              large: 'image-large.jpg'
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

    mock
      .onGet('http://musicbrainz.org/ws/2/release-group', {
        params: { query: keyword, fmt: 'json' }
      })
      .reply(200, data);

    return getAlbums(keyword).then(res => expect(res).toEqual(result));
  });

  it('should throw an error if the request failed', async () => {
    const keyword = 'wall';
    mock
      .onGet('http://musicbrainz.org/ws/2/release-group', {
        params: { query: keyword, fmt: 'json' }
      })
      .reply(404);
    await expect(getAlbums(keyword)).rejects.toThrow();
  });
});
