import axios from 'axios';
import throttle from 'lodash.throttle';
import * as actionTypes from '../types';
import getCoverData from '../helpers/getCoverData';

const beginGetAlbums = () => {
  return { type: actionTypes.GET_ALBUMS_BEGIN };
};

const getAlbumsError = message => {
  return {
    type: actionTypes.GET_ALBUMS_ERROR,
    message
  };
};

const getAlbumsSuccess = albums => {
  return {
    type: actionTypes.GET_ALBUMS_SUCCESS,
    albums
  };
};

export const clearAlbums = () => {
  console.log('clearAlbums');
  return {
    type: actionTypes.CLEAR_ALBUMS
  };
};

export const getAlbums = keyword => {
  return async dispatch => {
    dispatch(beginGetAlbums());
    try {
      const releaseData = await axios.get('http://musicbrainz.org/ws/2/release-group', {
        params: { query: keyword, fmt: 'json' }
      });
      const releaseGroups = releaseData.data['release-groups'];
      const data = await Promise.all(
        releaseGroups.map(async album => {
          const id = album.id;
          const artist = album['artist-credit'].map(person => ({
            id: person.artist.id,
            name: person.artist.name
          }));
          const title = album.title;
          const albumData = { id, artist, title, image: null };
          try {
            const coverData = await getCoverData(album.releases);
            return Promise.resolve({
              ...albumData,
              ...{
                image: {
                  small: coverData[0]?.thumbnails?.small || null,
                  large: coverData[0]?.thumbnails?.large || null
                }
              }
            });
          } catch (e) {
            return Promise.resolve(albumData);
          }
        })
      );
      dispatch(getAlbumsSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(getAlbumsError('users'));
    }
  };
};
