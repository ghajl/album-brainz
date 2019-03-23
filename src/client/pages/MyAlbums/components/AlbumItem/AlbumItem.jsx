import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import withStyles from 'react-jss';
import Media from 'react-bootstrap/Media';
import styles from './AlbumItemStyles';
import { LinkContainer } from 'react-router-bootstrap';
import Image from '../../../shared/Image';

const AlbumItem = ({ classes, id, title, artist, image, removeFromMyList }) => {
  return (
    <Media data-testid="album">
      <div className="mr-3">
        <Image
          data-testid="image"
          className={classes.image}
          width={120}
          src={image}
          alt="Generic placeholder"
        />
      </div>
      <Media.Body className={classes.mediaBody}>
        <h3 data-testid="title">{title}</h3>

        <div data-testid="artists" className={classes.info}>
          <div>Artist:</div>
          {artist.map(artist => (
            <h5 key={artist.id} data-testid="name">
              {artist.name}
            </h5>
          ))}
        </div>
        <div className={classes.buttonGroup}>
          <Button
            data-testid="remove"
            className="mr-2"
            size="sm"
            variant="primary"
            role="button"
            onClick={() => removeFromMyList(id)}
          >
            Remove
          </Button>
          <LinkContainer to={`/album-details/${id}`}>
            <Button data-testid="details" as="a" size="sm" variant="primary" role="button">
              Details
            </Button>
          </LinkContainer>
        </div>
      </Media.Body>
    </Media>
  );
};

export default withStyles(styles)(AlbumItem);

AlbumItem.propTypes = {
  classes: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  artist: PropTypes.arrayOf(PropTypes.shape({})),
  date: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string
};

AlbumItem.defaultProps = {
  classes: {},
  artist: [],
  date: '',
  title: '',
  image: null
};
