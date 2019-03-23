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
const beginLoadData = () => {
  return {
    type: actionTypes.BEGIN_LOAD_DATA
  };
};

const loadDataSuccess = data => {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  };
};
const loadDataError = data => {
  return {
    type: actionTypes.LOAD_DATA_ERROR
  };
};
const pushLoadedData = album => {
  return {
    type: actionTypes.PUSH_LOADED_DATA,
    album
  };
};

export const loadData = () => {
  return async (dispatch, getState) => {
    dispatch(beginLoadData());
    try {
      const result = {};
      const ids = getState().user.albumsLocal;
      await Promise.map(
        ids,
        async id => {
          let album;
          try {
            album = await apiCall(id);
          } catch (e) {
            console.log(e);
          }
          console.log(album);
          const { artist = [], title = null, image = null } = album;
          result[id] = {
            artist: [...artist],
            title,
            image
          };
          dispatch(pushLoadedData(result));
        },
        { concurrency: 5 }
      );
      // data.forEach(({ id, artist, title, image }) => {
      //   result[id] = {
      //     artist: [...artist],
      //     title,
      //     image
      //   };
      // });
      return dispatch(loadDataSuccess());
    } catch (err) {
      console.log(err);
      dispatch(loadDataError('users'));
    }
  };
};

export const closeDialog = () => {
  return {
    type: actionTypes.CLOSE_DIALOG
  };
};

const addToMyListError = message => {
  return {
    type: actionTypes.ADD_TO_MY_LIST_ERROR,
    message
  };
};

const removeFromMyListError = message => {
  return {
    type: actionTypes.REMOVE_FROM_MY_LIST_ERROR,
    message
  };
};

export const addToMyList = ({ id, image, artist, title }) => {
  return (dispatch, getState) => {
    const myAlbums = getState().user.albums;
    if (typeof myAlbums[id] === 'undefined') {
      const myList = ls('my-albums');
      ls('my-albums', [...myList, id]);
      return dispatch({
        type: actionTypes.ADD_TO_MY_LIST,
        id,
        image: image?.small || null,
        artist,
        title
      });
    }
    dispatch(addToMyListError('Album already in list'));
  };
};

export const removeFromMyList = id => {
  return (dispatch, getState) => {
    const myAlbums = getState().user.albums;
    if (typeof myAlbums[id] !== 'undefined') {
      const myList = ls('my-albums');
      const ind = myList.indexOf(id);
      if (ind !== -1) {
        ls('my-albums', [...myList.slice(0, ind), ...myList.slice(ind + 1)]);
      }

      return dispatch({
        type: actionTypes.REMOVE_FROM_MY_LIST,
        id
      });
    }
    dispatch(removeFromMyListError('Album already not in list'));
  };
};
