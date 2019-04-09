import * as actionTypes from '../types';

const albums = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALBUMS_SUCCESS:
      return [...action.albums];
    case actionTypes.FETCH_ALBUMS_BEGIN:
    case actionTypes.FETCH_ALBUMS_FAILURE:
    case actionTypes.CLEAR_ALBUMS:
      return [];
    default:
      return state;
  }
};

export default albums;
