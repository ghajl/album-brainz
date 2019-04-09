import React from 'react';
import { connect } from 'react-redux';
import MyAlbums from './MyAlbums';
import { fetchUserAlbumsInfo } from '../../../../data/actionCreators/user';

class MyAlbumsContainer extends React.Component {
  state = {
    albums: Object.keys(this.props.albumsData).map(id => {
      const { artists = [], title = '', images = [] } = this.props.albumsData[id];
      return {
        id,
        artists,
        title,
        image:
          images[0]?.thumbnails?.large ||
          images[0]?.thumbnails?.small ||
          images[0]?.image ||
          'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
      };
    })
  };
  componentDidMount() {
    const { fetchUserAlbumsInfo, albumsData, albums } = this.props;
    if (albums.length > 0 && albums.length !== Object.keys(albumsData).length)
      fetchUserAlbumsInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevIds = Object.keys(prevProps.albumsData);
    const ids = Object.keys(this.props.albumsData);
    if (prevIds.length !== ids.length) {
      this.setState((state, props) => {
        let albums = [...state.albums];
        if (ids.length > prevIds.length) {
          ids.forEach(id => {
            if (!prevProps.albumsData[id]) {
              const { artists = [], title = '', images = [] } = props.albumsData[id];
              const album = {
                id,
                artists,
                title,
                image:
                  images[0]?.thumbnails?.large ||
                  images[0]?.thumbnails?.small ||
                  images[0]?.image ||
                  'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
              };
              albums.push(album);
            }
          });
        } else {
          prevIds.forEach(id => {
            if (!this.props.albumsData[id]) {
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
  ({ user: { albumsData, albums, isWaiting } }) => ({
    albumsData,
    albums,
    isWaiting
  }),
  { fetchUserAlbumsInfo }
)(MyAlbumsContainer);
