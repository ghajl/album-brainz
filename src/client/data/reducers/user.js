import { combineReducers } from 'redux';
import * as actionTypes from '../types';

const message = (state = '', action) => {
  switch (action.type) {
    case actionTypes.GET_ALBUMS_ERROR:
    case actionTypes.GET_DETAILS_ERROR:
    case actionTypes.ADD_TO_MY_LIST_ERROR:
    case actionTypes.REMOVE_FROM_MY_LIST_ERROR:
      return action.message;
    case actionTypes.CLOSE_DIALOG:
    case actionTypes.ADD_TO_MY_LIST:
    case actionTypes.REMOVE_FROM_MY_LIST:
      return '';
    default:
      return state;
  }
};

const isWaiting = (state = false, action) => {
  switch (action.type) {
    case actionTypes.GET_DETAILS_BEGIN:
    case actionTypes.GET_ALBUMS_BEGIN:
    case actionTypes.BEGIN_LOAD_DATA:
      return true;
    case actionTypes.GET_ALBUMS_ERROR:
    case actionTypes.GET_ALBUMS_SUCCESS:
    case actionTypes.GET_DETAILS_ERROR:
    case actionTypes.LOAD_DATA_ERROR:
    case actionTypes.GET_DETAILS_SUCCESS:
    case actionTypes.LOAD_DATA_SUCCESS:
      return false;
    default:
      return state;
  }
};

const albums = (state = {}, action) => {
  switch (action.type) {
    // case actionTypes.LOAD_DATA_SUCCESS:
    //   return { ...action.data };
    case actionTypes.PUSH_LOADED_DATA:
      return { ...state, ...action.album };
    case actionTypes.ADD_TO_MY_LIST: {
      const { id, artist, title, image } = action;
      const albumData = {
        artist,
        title,
        image
      };
      return { ...state, ...{ [id]: albumData } };
    }
    case actionTypes.REMOVE_FROM_MY_LIST: {
      const { id } = action;
      console.log(state);
      const { [id]: deletedKey, ...otherKeys } = state;
      console.log(otherKeys);
      return otherKeys;
    }
    default:
      return state;
  }
};

const albumsLocal = (state = [], action) => {
  switch (action.type) {
    // case actionTypes.LOAD_DATA_SUCCESS:
    //   return { ...action.data };

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
  albums,
  isWaiting,
  albumsLocal
});

export default userReducer;
