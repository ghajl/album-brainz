import axios from 'axios';
import ls from 'local-storage';
import Promise from 'bluebird';
import * as actionTypes from '../types';
import getAlbumData from '../helpers/getAlbumData';

const apiCall = id => {
  return Promise.delay(3000).then(async () => {
    const data = await getAlbumData(id);
    return data;
  });
};
const fetchUserAlbumsInfoBegin = () => {
  return {
    type: actionTypes.FETCH_USER_ALBUMS_INFO_BEGIN
  };
};

const fetchUserAlbumsInfoSuccess = data => {
  return {
    type: actionTypes.FETCH_USER_ALBUMS_INFO_SUCCESS,
    data
  };
};
const fetchUserAlbumsInfoFailure = data => {
  return {
    type: actionTypes.FETCH_USER_ALBUMS_INFO_FAILURE
  };
};
const pushLoadedData = album => {
  return {
    type: actionTypes.PUSH_LOADED_DATA,
    album
  };
};

export const fetchUserAlbumsInfo = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserAlbumsInfoBegin());
    try {
      const result = {};
      const ids = getState().user.albums;
      await Promise.map(
        ids,
        async id => {
          let album;
          try {
            album = await apiCall(id);
          } catch (e) {
            console.log(e);
          }
          const { artists = [], title = '', images = [] } = album;
          result[id] = {
            artists,
            title,
            images
          };
          dispatch(pushLoadedData(result));
        },
        { concurrency: 5 }
      );
      return dispatch(fetchUserAlbumsInfoSuccess());
    } catch (err) {
      dispatch(fetchUserAlbumsInfoFailure('users'));
    }
  };
};

export const closeDialog = () => {
  return {
    type: actionTypes.CLOSE_DIALOG
  };
};

const addToMyListFailure = message => {
  return {
    type: actionTypes.ADD_TO_MY_LIST_FAILURE,
    message
  };
};

const removeFromMyListFailure = message => {
  return {
    type: actionTypes.REMOVE_FROM_MY_LIST_FAILURE,
    message
  };
};

export const addToMyList = ({ id, images, artists, title }) => {
  return (dispatch, getState) => {
    const myAlbums = getState().user.albums;
    if (!~myAlbums.indexOf(id)) {
      const myList = ls('my-albums');
      if (!~myList.indexOf(id)) ls('my-albums', [...myList, id]);
      return dispatch({
        type: actionTypes.ADD_TO_MY_LIST,
        id,
        images,
        artists,
        title
      });
    }
    dispatch(addToMyListFailure('Album already in the list'));
  };
};

export const removeFromMyList = id => {
  return (dispatch, getState) => {
    const myAlbums = getState().user.albums;
    if (!!~myAlbums.indexOf(id)) {
      const myList = ls('my-albums');
      const ind = myList.indexOf(id);
      if (!!~myList.indexOf(id)) {
        ls('my-albums', [...myList.slice(0, ind), ...myList.slice(ind + 1)]);
      }

      return dispatch({
        type: actionTypes.REMOVE_FROM_MY_LIST,
        id
      });
    }
    dispatch(removeFromMyListFailure('Album already not in the list'));
  };
};
