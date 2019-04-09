import axios from 'axios';
import throttle from 'lodash.throttle';
import * as actionTypes from '../types';
import getAlbums from '../helpers/getAlbums';

const fetchAlbumsBegin = () => {
  return { type: actionTypes.FETCH_ALBUMS_BEGIN };
};

const fetchAlbumsFailure = message => {
  return {
    type: actionTypes.FETCH_ALBUMS_FAILURE,
    message
  };
};

const fetchAlbumsSuccess = albums => {
  return {
    type: actionTypes.FETCH_ALBUMS_SUCCESS,
    albums
  };
};

export const clearAlbums = () => {
  return {
    type: actionTypes.CLEAR_ALBUMS
  };
};

export const fetchAlbums = keyword => {
  return async dispatch => {
    dispatch(fetchAlbumsBegin());
    try {
      const data = await getAlbums(keyword);
      dispatch(fetchAlbumsSuccess(data));
    } catch (err) {
      dispatch(fetchAlbumsFailure('Unable to show results'));
    }
  };
};
