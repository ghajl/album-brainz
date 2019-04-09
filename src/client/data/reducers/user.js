import { combineReducers } from 'redux';
import * as actionTypes from '../types';

export const message = (state = '', action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALBUMS_FAILURE:
    case actionTypes.FETCH_ALBUM_INFO_FAILURE:
    case actionTypes.ADD_TO_MY_LIST_FAILURE:
    case actionTypes.REMOVE_FROM_MY_LIST_FAILURE:
      return action.message;
    case actionTypes.CLOSE_DIALOG:
      return '';
    default:
      return state;
  }
};

export const isWaiting = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALBUM_INFO_BEGIN:
    case actionTypes.FETCH_ALBUMS_BEGIN:
    case actionTypes.FETCH_USER_ALBUMS_INFO_BEGIN:
      return true;
    case actionTypes.FETCH_ALBUMS_FAILURE:
    case actionTypes.FETCH_ALBUMS_SUCCESS:
    case actionTypes.FETCH_ALBUM_INFO_FAILURE:
    case actionTypes.FETCH_ALBUM_INFO_SUCCESS:
    case actionTypes.FETCH_USER_ALBUMS_INFO_FAILURE:
    case actionTypes.FETCH_USER_ALBUMS_INFO_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const albumsData = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PUSH_LOADED_DATA:
      return { ...state, ...action.album };
    case actionTypes.ADD_TO_MY_LIST: {
      const { id, artists, title, images } = action;
      const albumData = {
        artists,
        title,
        images
      };
      return { ...state, ...{ [id]: albumData } };
    }
    case actionTypes.REMOVE_FROM_MY_LIST: {
      const { id } = action;
      const { [id]: deletedKey, ...otherKeys } = state;
      return otherKeys;
    }
    default:
      return state;
  }
};

export const albums = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_MY_LIST: {
      const { id } = action;
      return [...state, id];
    }
    case actionTypes.REMOVE_FROM_MY_LIST: {
      const { id } = action;
      const ind = state.indexOf(id);
      if (ind !== -1) {
        return [...state.slice(0, ind), ...state.slice(ind + 1)];
      }
      return state;
    }
    default:
      return state;
  }
};

const userReducer = combineReducers({
  message,
  albumsData,
  isWaiting,
  albums
});

export default userReducer;
