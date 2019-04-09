import axios from 'axios';
import * as actionTypes from '../types';
import getAlbumData from '../helpers/getAlbumData';

const fetchAlbumInfoBegin = () => {
  return { type: actionTypes.FETCH_ALBUM_INFO_BEGIN };
};

const fetchAlbumInfoSuccess = (id, artists, title, images, date) => {
  return {
    type: actionTypes.FETCH_ALBUM_INFO_SUCCESS,
    id,
    artists,
    title,
    images,
    date
  };
};

const fetchAlbumInfoFailure = message => {
  return {
    type: actionTypes.FETCH_ALBUM_INFO_FAILURE,
    message
  };
};

export const fetchAlbumInfo = albumId => {
  return async dispatch => {
    dispatch(fetchAlbumInfoBegin());
    try {
      const { id, artists, title, images, date } = await getAlbumData(albumId);
      if (id) {
        return dispatch(fetchAlbumInfoSuccess(id, artists, title, images, date));
      }
      dispatch(fetchAlbumInfoFailure('Album Not Found'));
    } catch (err) {
      dispatch(fetchAlbumInfoFailure('Album Not Found'));
    }
  };
};
