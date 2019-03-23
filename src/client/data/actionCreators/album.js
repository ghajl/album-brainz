import axios from 'axios';
import * as actionTypes from '../types';
import getAlbumData from '../helpers/getAlbumData';

const beginGetDetails = () => {
  return { type: actionTypes.GET_DETAILS_BEGIN };
};

const getDetailsSuccess = (id, artist, title, image, date) => {
  console.log(id, artist, title, date);
  return {
    type: actionTypes.GET_DETAILS_SUCCESS,
    id,
    artist,
    title,
    image,
    date
  };
};

const getDetailsError = message => {
  return {
    type: actionTypes.GET_DETAILS_ERROR,
    message
  };
};

export const getAlbumDetails = albumID => {
  return async dispatch => {
    dispatch(beginGetDetails());
    try {
      console.log('getAlbumDetails');
      const { id, artist, title, image, date } = await getAlbumData(albumID);
      dispatch(getDetailsSuccess(id, artist, title, image, date));
    } catch (err) {
      console.log(err);
      dispatch(getDetailsError('Album Not Found'));
    }
  };
};
