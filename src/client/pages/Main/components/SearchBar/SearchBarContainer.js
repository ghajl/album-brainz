import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from './SearchBarStyles';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import SearchBar from './SearchBar';
import { getAlbums } from '../../../../data/actionCreators/albums';

const validationSchema = Yup.object().shape({
  request: Yup.string().required('Required')
});

const configFormik = {
  mapPropsToValues: props => {
    const { location } = props;
    const search = qs.parse(location.search);
    let value = '';
    if (location.pathname === '/search' && typeof search.q !== 'undefined') {
      value = search.q;
    }
    return {
      request: value
    };
  },
  validationSchema: validationSchema,
  handleSubmit: (values, { setSubmitting, props }) => {
    props.history.push('/search?q=' + values.request);
  },
  validateOnChange: false,
  validateOnBlur: false,
  enableReinitialize: true
};

export default withRouter(
  withFormik(configFormik)(
    connect(
      ({ user: { isWaiting } }) => ({ isWaiting }),
      { getAlbums }
    )(SearchBar)
  )
);
