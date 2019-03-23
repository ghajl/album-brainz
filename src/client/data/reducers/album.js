import * as actionTypes from '../types';

const album = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_DETAILS_SUCCESS:
      const { id, artist, title, image, date } = action;
      return { id, artist, title, image, date };
    case actionTypes.GET_DETAILS_BEGIN:
    case actionTypes.CLEAR_ALBUMS:
    case actionTypes.GET_DETAILS_ERROR:
      return {};
    default:
      return state;
  }
};

export default album;
