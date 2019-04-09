import createAlbum from './createAlbum';

afterEach(() => {
  jest.clearAllMocks();
});

describe('ceate album factory', () => {
  it('should return object', () => {
    const data = {
      id: 'f34235',
      artistCredit: [
        {
          artist: {
            id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
            name: 'Nirvana'
          }
        }
      ],
      images: {
        image: 'image.jpg',
        thumbnails: {
          large: 'image-large.jpg',
          small: 'image-small.jpg'
        }
      },
      title: 'Nevermind',
      date: '1991-09-23'
    };
    const result = {
      id: 'f34235',
      artists: [
        {
          id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
          name: 'Nirvana'
        }
      ],
      images: {
        image: 'image.jpg',
        thumbnails: {
          large: 'image-large.jpg',
          small: 'image-small.jpg'
        }
      },
      title: 'Nevermind',
      date: '1991-09-23'
    };
    expect(createAlbum(data)).toEqual(result);
  });
  it('should return object with default fields', () => {
    const data = {
      id: 'f34235'
    };
    const result = {
      id: 'f34235',
      artists: [],
      images: [],
      title: '',
      date: ''
    };
    expect(createAlbum(data)).toEqual(result);
  });
});
