import * as actionTypes from '../types';

const album = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALBUM_INFO_SUCCESS:
      const { id, artists, title, images, date } = action;
      return { id, artists, title, images, date };
    case actionTypes.FETCH_ALBUM_INFO_BEGIN:
    case actionTypes.FETCH_ALBUM_INFO_FAILURE:
      return {};
    default:
      return state;
  }
};

export default album;
