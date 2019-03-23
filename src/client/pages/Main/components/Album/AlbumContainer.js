import React from 'react';
import { connect } from 'react-redux';
import Album from './Album';
import { addToMyList } from '../../../../data/actionCreators/user';

export default connect(
  () => ({}),
  { addToMyList }
)(Album);
