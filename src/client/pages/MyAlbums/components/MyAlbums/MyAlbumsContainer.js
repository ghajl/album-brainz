import React from 'react';
import { connect } from 'react-redux';
import MyAlbums from './MyAlbums';
import { loadData } from '../../../../data/actionCreators/user';

class MyAlbumsContainer extends React.Component {
  state = {
    albums: Object.keys(this.props.albums).map(id => ({
      id,
      artist: this.props.albums[id]?.artist || [],
      title: this.props.albums[id]?.title || null,
      image:
        this.props.albums[id]?.image ||
        'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
    }))
  };
  componentDidMount() {
    const { loadData, albums, albumsLocal } = this.props;
    if (albumsLocal.length > 0 && albumsLocal.length !== Object.keys(albums).length) loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevIds = Object.keys(prevProps.albums);
    const ids = Object.keys(this.props.albums);
    if (prevIds.length !== ids.length) {
      this.setState((state, props) => {
        let albums = [...state.albums];
        if (ids.length > prevIds.length) {
          ids.forEach(id => {
            if (!prevProps.albums[id]) {
              const album = {
                id,
                artist: props.albums[id]?.artist || [],
                title: props.albums[id]?.title || null,
                image:
                  props.albums[id]?.image ||
                  'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
              };
              albums.push(album);
            }
          });
        } else {
          prevIds.forEach(id => {
            if (!this.props.albums[id]) {
              const ind = albums.findIndex(album => album.id === id);
              if (ind !== -1) {
                albums = [...albums.slice(0, ind), ...albums.slice(ind + 1)];
              }
            }
          });
        }
        return { albums };
      });
    }
  }

  render() {
    const { albums } = this.state;
    const { isWaiting } = this.props;
    return <MyAlbums albums={albums} isWaiting={isWaiting} />;
  }
}

export default connect(
  ({ user: { albums, albumsLocal, isWaiting } }) => ({
    albums,
    albumsLocal,
    isWaiting
  }),
  { loadData }
)(MyAlbumsContainer);
