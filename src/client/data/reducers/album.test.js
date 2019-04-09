import * as actionTypes from '../types';
import reducer from './album';

describe('album reducer', () => {
  it('should return the initial state', () => {
    const initialState = {};
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_ALBUM_INFO_SUCCESS', () => {
    const state = {};
    const action = {
      type: actionTypes.FETCH_ALBUM_INFO_SUCCESS,
      id: '1',
      artists: {
        id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
        name: 'Nirvana'
      },
      title: 'Nevermind',
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
      date: '1991-09-23'
    };
    const expectedState = {
      id: '1',
      artists: {
        id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
        name: 'Nirvana'
      },
      title: 'Nevermind',
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
      date: '1991-09-23'
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ALBUM_INFO_BEGIN', () => {
    const state = {
      id: '1',
      artists: {
        id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
        name: 'Nirvana'
      },
      title: 'Nevermind',
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
      date: '1991-09-23'
    };
    const action = {
      type: actionTypes.FETCH_ALBUM_INFO_BEGIN
    };
    const expectedState = {};
    expect(reducer(state, action)).toEqual(expectedState);
  });
  it('should handle FETCH_ALBUM_INFO_FAILURE', () => {
    const state = {
      id: '1',
      artists: {
        id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
        name: 'Nirvana'
      },
      title: 'Nevermind',
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
      date: '1991-09-23'
    };
    const action = {
      type: actionTypes.FETCH_ALBUM_INFO_FAILURE
    };
    const expectedState = {};
    expect(reducer(state, action)).toEqual(expectedState);
  });
});
