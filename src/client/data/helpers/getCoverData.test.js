import '@babel/polyfill';
import getCoverData from './getCoverData';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
afterEach(() => {
  mock.reset();
  jest.clearAllMocks();
});

describe('getCoverData should get data from the server and return object that contains images', () => {
  const releases = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ];

  it('should get data from the server and return object that contains images', () => {
    const result = [
      {
        id: '1',
        image: 'image.jpg',
        thumbnails: {
          large: 'image-large.jpg',
          small: 'image-small.jpg'
        }
      }
    ];
    const data = {
      images: result
    };
    mock.onGet('http://coverartarchive.org/release/2').reply(200, data);

    return getCoverData(releases).then(res => expect(res).toEqual(result));
  });

  it('should return data after first image found', () => {
    const firstResult = [
      {
        id: '1',
        image: 'first_image.jpg',
        thumbnails: {
          large: 'image-large.jpg',
          small: 'image-small.jpg'
        }
      }
    ];
    const secondResult = [
      {
        id: '2',
        image: 'second_image.jpg',
        thumbnails: {
          large: 'image-large.jpg',
          small: 'image-small.jpg'
        }
      }
    ];
    const firstResponseData = {
      images: firstResult
    };
    const secondResponseData = {
      images: secondResult
    };
    mock
      .onGet('http://coverartarchive.org/release/2')
      .reply(200, firstResponseData)
      .onGet('http://coverartarchive.org/release/3')
      .reply(200, secondResponseData);

    let spy = jest.spyOn(axios, 'get');
    return getCoverData(releases).then(res => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(res).toEqual(firstResult);
    });
  });

  it('should check all items in the list and return an empty object when no cover available', () => {
    mock
      .onGet('http://coverartarchive.org/release/1')
      .reply(404)
      .onGet('http://coverartarchive.org/release/2')
      .reply(404)
      .onGet('http://coverartarchive.org/release/3')
      .reply(404);
    let spy = jest.spyOn(axios, 'get');
    return getCoverData(releases).then(res => {
      expect(spy).toHaveBeenCalledTimes(3);
      expect(res).toEqual([]);
    });
  });
});
