import React from 'react';
import { connect } from 'react-redux';
import Albums from './Albums';
import { addToMyList } from '../../../../data/actionCreators/user';

export default connect(
  ({ albums }) => ({
    albums
  }),
  { addToMyList }
)(Albums);
