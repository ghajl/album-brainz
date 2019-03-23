import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import styles from './AlbumDetailsStyles';
import Info from '../Info';

const AlbumDetails = ({ classes, img, id, artist, title, date, isWaiting, addToMyList }) => (
  <Container className="mt-5" data-testid="details">
    <Row>
      <Col sm={6}>
        <Image data-testid="image" src={img} thumbnail />
      </Col>
      <Col sm={6}>
        <Info data-testid="info" id={id} artist={artist} title={title} date={date} />
        <Button
          onClick={() => addToMyList({ id, img, artist, title })}
          className="mr-2"
          size="sm"
          variant="primary"
        >
          Add
        </Button>
      </Col>
    </Row>
  </Container>
);

export default withStyles(styles)(AlbumDetails);

AlbumDetails.propTypes = {
  classes: PropTypes.shape({}),
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  artist: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  date: PropTypes.string
};

AlbumDetails.defaultProps = {
  classes: {},
  artist: [],
  title: '',
  date: ''
};
