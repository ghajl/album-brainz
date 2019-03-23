import * as actionTypes from '../types';

const albums = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ALBUMS_SUCCESS:
      return [...action.albums];
    case actionTypes.GET_ALBUMS_BEGIN:
    case actionTypes.CLEAR_ALBUMS:
      console.log(state);
      return [];
    default:
      return state;
  }
};

export default albums;
