import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import styles from './AlbumNotFoundStyles';

const AlbumNotFound = ({ classes }) => (
  <Container className="mt-5">
    <h1>Album Not Found</h1>
  </Container>
);

export default withStyles(styles)(AlbumNotFound);

AlbumNotFound.propTypes = {
  classes: PropTypes.shape({})
};

AlbumNotFound.defaultProps = {
  classes: {}
};
