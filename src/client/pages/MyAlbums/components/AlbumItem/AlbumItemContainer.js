import React from 'react';
import { connect } from 'react-redux';
import AlbumItem from './AlbumItem';
import { removeFromMyList } from '../../../../data/actionCreators/user';

export default connect(
  () => ({}),
  { removeFromMyList }
)(AlbumItem);
