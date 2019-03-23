import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import withStyles from 'react-jss';
import ReactLoading from 'react-loading';
import styles from './MainStyles';
import { SearchBarContainer as SearchBar } from '../SearchBar';
import Albums from '../Albums/AlbumsContainer';

const Main = ({ classes, isWaiting }) => {
  return (
    <div className={classes.container} data-testid="main">
      <Container fluid className="mt-5">
        <Row>
          <Col>
            <SearchBar data-testid="searchbar" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Albums data-testid="albums" />
          </Col>
        </Row>
      </Container>
      {!!isWaiting && (
        <ReactLoading
          data-testid="loading"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fill: '#00f',
            width: 100
          }}
          type="spin"
        />
      )}
    </div>
  );
};

export default withStyles(styles)(Main);

Main.propTypes = {
  classes: PropTypes.shape({})
};

Main.defaultProps = {
  classes: {}
};
