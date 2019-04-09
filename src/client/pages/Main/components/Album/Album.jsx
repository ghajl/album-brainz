import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import withStyles from 'react-jss';
import Image from '../../../shared/Image';
import styles from './AlbumStyles';

const renderImage = (image, classes) => {
  return image == null ? null : (
    <Image className={classes.image} width="100%" src={image} data-testid="image" />
  );
};

const renderArtistsNames = names =>
  names.map(artist => (
    <Card.Title key={artist.id} data-testid="name">
      {artist.name}
    </Card.Title>
  ));

const Album = ({ id, image, artists, title, add, classes }) => (
  <Card key={id} bg="dark" text="white" data-testid="album">
    {renderImage(image, classes)}
    <Card.Body>
      {renderArtistsNames(artists)}
      <Card.Text data-testid="title">{title}</Card.Text>
      <Button
        onClick={add}
        data-testid="add"
        className="mr-2"
        size="sm"
        variant="primary"
        role="button"
      >
        Add
      </Button>
      <LinkContainer to={`/album-details/${id}`}>
        <Button as="a" data-testid="details" size="sm" variant="primary" role="button">
          Details
        </Button>
      </LinkContainer>
    </Card.Body>
  </Card>
);

export default withStyles(styles)(Album);
