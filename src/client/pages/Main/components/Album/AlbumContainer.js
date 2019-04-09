import React from 'react';
import { connect } from 'react-redux';
import Album from './Album';
import { addToMyList } from '../../../../data/actionCreators/user';

export default connect(
  () => ({}),
  { addToMyList },
  (stateProps, dispatchProps, { images, ...ownProps }) => ({
    image: images[0]?.thumbnails?.large || images[0]?.thumbnails?.small || images[0]?.image || null,
    ...ownProps,
    add: () => {
      const { id, artists, title } = ownProps;
      dispatchProps.addToMyList({ id, artists, title, images });
    }
  })
)(Album);
