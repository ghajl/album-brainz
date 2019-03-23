import React from 'react';
import PropTypes from 'prop-types';
import CardColumns from 'react-bootstrap/CardColumns';
import { AlbumContainer as Album } from '../Album';

const Albums = ({ albums, addToMyList, ...props }) => {
  console.log('Albums');
  return albums.length === 0 ? null : (
    <CardColumns {...props}>
      {albums.map(({ id, image, artist, title }) => (
        <Album key={id} id={id} image={image} artist={artist} title={title} />
      ))}
    </CardColumns>
  );
};

export default Albums;

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({}))
};

Albums.defaultProps = {
  albums: []
};
