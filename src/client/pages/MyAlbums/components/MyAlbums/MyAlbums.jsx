import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import withStyles from 'react-jss';
import ListGroup from 'react-bootstrap/ListGroup';
import ReactLoading from 'react-loading';
import styles from './MyAlbumsStyles';
import { AlbumItemContainer as AlbumItem } from '../AlbumItem';

const renderAlbums = albums =>
  albums.map(({ id, title, artist, image }) => (
    <ListGroup.Item key={id} data-testid="item">
      <AlbumItem id={id} title={title} artist={artist} image={image} />
    </ListGroup.Item>
  ));

const MyAlbums = ({ classes, albums, isWaiting }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Container className="mt-5">
          <ListGroup className={classes.albumsList} variant="flush">
            {renderAlbums(albums)}
          </ListGroup>
          {!!isWaiting && (
            <ReactLoading
              style={{
                position: 'relative',
                top: 30,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fill: '#00a',
                width: 100
              }}
              type="bubbles"
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default withStyles(styles)(MyAlbums);

MyAlbums.propTypes = {
  classes: PropTypes.shape({}),
  albums: PropTypes.arrayOf(PropTypes.shape({}))
};

MyAlbums.defaultProps = {
  classes: {},
  albums: []
};
