import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Main from './Main';
import { fetchAlbums, clearAlbums } from '../../../../data/actionCreators/albums';

class MainContainer extends React.Component {
  componentDidMount() {
    const { location, fetchAlbums, clearAlbums } = this.props;
    const search = qs.parse(location.search);

    if (location.pathname === '/search' && typeof search.q !== 'undefined') {
      fetchAlbums(search.q);
    } else if (typeof search.q == 'undefined') {
      clearAlbums();
    }
  }
  componentDidUpdate(prevProps) {
    const { location, fetchAlbums, clearAlbums } = this.props;
    const { location: prevLocation } = prevProps;
    const search = qs.parse(location.search);
    const prevSearch = qs.parse(prevLocation.search);
    if (typeof search.q !== 'undefined' && search.q !== prevSearch.q) {
      fetchAlbums(search.q);
    } else if (typeof search.q == 'undefined') {
      clearAlbums();
    }
  }

  render() {
    const { isWaiting } = this.props;
    return <Main isWaiting={isWaiting} />;
  }
}

export default withRouter(
  connect(
    ({ user: { isWaiting } }) => ({ isWaiting }),
    { fetchAlbums, clearAlbums }
  )(MainContainer)
);
