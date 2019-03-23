import React from 'react';
import { connect } from 'react-redux';
import { closeDialog } from '../data/actionCreators/user';
import Page from './Page';

export default connect(
  ({ user, album }) => ({ message: user.message, isWaiting: user.isWaiting }),
  { closeDialog }
)(Page);
