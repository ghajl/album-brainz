import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from 'react-jss';
import ReactLoading from 'react-loading';
import AlbumDetails from './AlbumDetails';
import { getAlbumDetails } from '../../../../data/actionCreators/album';
import { closeDialog, addToMyList } from '../../../../data/actionCreators/user';
import AlbumNotFound from '../AlbumNotFound';
import styles from './AlbumDetailsStyles';

class AlbumDetailsContainer extends React.Component {
  componentDidMount() {
    const { match, getAlbumDetails } = this.props;
    const { id } = match.params;
    getAlbumDetails(id);
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
    const { classes, isWaiting, image, id, artist, title, date, addToMyList } = this.props;
    const renderComponent = id ? this.renderAlbumDetails : this.renderAlbumNotFound;
    const img = image || 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg';

    return (
      <div className={classes.container}>
        {!!isWaiting
          ? this.renderLoading()
          : renderComponent({ isWaiting, img, id, artist, title, date, addToMyList })}
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ user, album }) => ({
      message: user.message,
      isWaiting: user.isWaiting,
      image: album.image,
      id: album.id,
      artist: album.artist,
      title: album.title,
      date: album.date
    }),
    { getAlbumDetails, closeDialog, addToMyList }
  )(withStyles(styles)(AlbumDetailsContainer))
);
