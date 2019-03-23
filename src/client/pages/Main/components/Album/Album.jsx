import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import withStyles from 'react-jss';
import Image from '../../../shared/Image';
import styles from './AlbumStyles';

const renderImage = (image, classes) => {
  const img = image?.large || null;
  console.log('image');
  return img == null ? null : <Image className={classes.image} width="100%" src={img} />;
};

const renderArtistsNames = names =>
  names.map(artist => <Card.Title key={artist.id}>{artist.name}</Card.Title>);

const Album = ({ id, image, artist, title, addToMyList, classes, ...props }) => (
  <Card key={id} bg="dark" text="white">
    {renderImage(image, classes)}
    <Card.Body>
      {renderArtistsNames(artist)}
      <Card.Text>{title}</Card.Text>
      <Button
        onClick={() => addToMyList({ id, image, artist, title })}
        className="mr-2"
        size="sm"
        variant="primary"
      >
        Add
      </Button>
      <LinkContainer to={`/album-details/${id}`}>
        <Button as="a" size="sm" variant="primary">
          Details
        </Button>
      </LinkContainer>
    </Card.Body>
  </Card>
);

export default withStyles(styles)(Album);
