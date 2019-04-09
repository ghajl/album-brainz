import React from 'react';
import PropTypes from 'prop-types';
import CardColumns from 'react-bootstrap/CardColumns';
import Album from '../Album/AlbumContainer';

const Albums = ({ albums, addToMyList, ...props }) => {
  return albums.length === 0 ? null : (
    <CardColumns data-testid="albums" {...props}>
      {albums.map(({ id, images, artists, title }) => (
        <Album data-testid={id} key={id} id={id} images={images} artists={artists} title={title} />
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
