import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from 'react-jss';
import ReactLoading from 'react-loading';
import AlbumDetails from './AlbumDetails';
import { fetchAlbumInfo } from '../../../../data/actionCreators/album';
import { closeDialog, addToMyList } from '../../../../data/actionCreators/user';
import AlbumNotFound from '../AlbumNotFound';
import styles from './AlbumDetailsStyles';

class AlbumDetailsContainer extends React.Component {
  componentDidMount() {
    const { match, fetchAlbumInfo } = this.props;
    const { id } = match.params;
    fetchAlbumInfo(id);
  }

  renderAlbumDetails = props => <AlbumDetails {...props} />;

  renderAlbumNotFound = () => <AlbumNotFound />;

  renderLoading = () => (
    <ReactLoading
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fill: '#00f',
        width: 100
      }}
      type="spin"
    />
  );

  render() {
    const { classes, isWaiting, images, id, artists, title, date, addToMyList } = this.props;
    const renderComponent = id ? this.renderAlbumDetails : this.renderAlbumNotFound;
    const add = () =>
      addToMyList({
        id,
        images,
        artists,
        title
      });
    const image =
      images[0]?.thumbnails?.large ||
      images[0]?.thumbnails?.small ||
      images[0]?.image ||
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg';

    return (
      <div className={classes.container}>
        {!!isWaiting
          ? this.renderLoading()
          : renderComponent({ isWaiting, image, id, artists, title, date, add })}
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ user, album }) => ({
      message: user.message,
      isWaiting: user.isWaiting,
      images: album.images,
      id: album.id,
      artists: album.artists,
      title: album.title,
      date: album.date
    }),
    { fetchAlbumInfo, closeDialog, addToMyList }
  )(withStyles(styles)(AlbumDetailsContainer))
);

AlbumDetailsContainer.propTypes = {
  classes: PropTypes.shape({}),
  isWaiting: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.shape({})),
  id: PropTypes.string,
  artists: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  date: PropTypes.string,
  addToMyList: PropTypes.func.isRequired
};

AlbumDetailsContainer.defaultProps = {
  classes: {},
  isWaiting: false,
  images: [],
  id: '',
  artists: [],
  title: '',
  date: ''
};
