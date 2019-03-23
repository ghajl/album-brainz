import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import withStyles from 'react-jss';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from './SearchBarStyles';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

const SearchBar = ({
  classes,
  values,
  errors,
  handleChange,
  handleSubmit,
  isWaiting,
  ...props
}) => {
  return (
    <Form className="m-4" onSubmit={handleSubmit} {...props}>
      <Form.Row className={classes.center}>
        <Form.Group controlId="formUsername">
          <Form.Control
            className={classes.textField}
            value={values.request}
            name="request"
            placeholder="Find Album"
            type="text"
            onChange={handleChange}
            isInvalid={!!errors.request}
          />
          <Form.Control.Feedback type="invalid">Empty field</Form.Control.Feedback>
        </Form.Group>
        <div>
          <Button type="submit" disabled={isWaiting}>
            Submit
          </Button>
        </div>
      </Form.Row>
    </Form>
  );
};

export default withStyles(styles)(SearchBar);

SearchBar.propTypes = {
  classes: PropTypes.shape({})
};

SearchBar.defaultProps = {
  classes: {}
};
