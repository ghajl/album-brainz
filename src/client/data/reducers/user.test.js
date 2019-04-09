import * as actionTypes from '../types';
import reducer, {
  message as messageReducer,
  isWaiting as isWaitingReducer,
  albumsData as albumsDataReducer,
  albums as albumsReducer
} from './user';

describe('message reducer', () => {
  it('should return the initial state', () => {
    const initialState = '';
    expect(messageReducer(undefined, {})).toEqual(initialState);
  });
});

describe('isWaiting reducer', () => {
  it('should return the initial state', () => {
    const initialState = false;
    expect(isWaitingReducer(undefined, {})).toEqual(initialState);
  });
});

describe('albumsData reducer', () => {
  it('should return the initial state', () => {
    const initialState = {};
    expect(albumsDataReducer(undefined, {})).toEqual(initialState);
  });
});

describe('albums reducer', () => {
  it('should return the initial state', () => {
    const initialState = [];
    expect(albumsReducer(undefined, {})).toEqual(initialState);
  });
});
