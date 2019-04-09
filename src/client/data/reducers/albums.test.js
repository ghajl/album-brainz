import * as actionTypes from '../types';
import reducer from './albums';

describe('albums reducer', () => {
  it('should return the initial state', () => {
    const initialState = [];
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_ALBUMS_SUCCESS', () => {
    const state = [];
    const action = {
      type: actionTypes.FETCH_ALBUMS_SUCCESS,
      albums: [
        {
          id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
          images: [],
          artists: [
            {
              id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
              name: 'Victor Ruiz'
            }
          ],
          title: 'Nevermind'
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
          title: 'Nevermind'
        }
      ]
    };
    const expectedState = [
      {
        id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
        images: [],
        artists: [
          {
            id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
            name: 'Victor Ruiz'
          }
        ],
        title: 'Nevermind'
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
        title: 'Nevermind'
      }
    ];
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ALBUMS_BEGIN', () => {
    const state = [
      {
        id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
        images: [],
        artists: [
          {
            id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
            name: 'Victor Ruiz'
          }
        ],
        title: 'Nevermind'
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
        title: 'Nevermind'
      }
    ];
    const action = {
      type: actionTypes.FETCH_ALBUMS_BEGIN
    };
    const expectedState = [];
    expect(reducer(state, action)).toEqual(expectedState);
  });
  it('should handle CLEAR_ALBUMS', () => {
    const state = [
      {
        id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
        images: [],
        artists: [
          {
            id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
            name: 'Victor Ruiz'
          }
        ],
        title: 'Nevermind'
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
        title: 'Nevermind'
      }
    ];
    const action = {
      type: actionTypes.CLEAR_ALBUMS
    };
    const expectedState = [];
    expect(reducer(state, action)).toEqual(expectedState);
  });
  it('should handle FETCH_ALBUMS_FAILURE', () => {
    const state = [
      {
        id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
        images: [],
        artists: [
          {
            id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
            name: 'Victor Ruiz'
          }
        ],
        title: 'Nevermind'
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
        title: 'Nevermind'
      }
    ];
    const action = {
      type: actionTypes.CLEAR_ALBUMS
    };
    const expectedState = [];
    expect(reducer(state, action)).toEqual(expectedState);
  });
});
