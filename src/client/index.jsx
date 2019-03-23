import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ls from 'local-storage';
import configureStore from './data/store';
import { renderRoutes } from 'react-router-config';
import routes from '../shared/routes';
import { loadData } from './data/actionCreators/user';
import '../styles/main.scss';

let myAlbumsLocalList = ls('my-albums');
if (myAlbumsLocalList == null) {
  myAlbumsLocalList = [];
  ls('my-albums', myAlbumsLocalList);
}
// const myAlbumsLocal = {};
// myAlbumsLocalList.forEach(item => (myAlbumsLocal[item] = null));
const preloadedState = {
  user: {
    albumsLocal: myAlbumsLocalList
  }
};

const store = configureStore(preloadedState);

render(
  <Provider store={store}>
    <Router>{renderRoutes(routes)}</Router>
  </Provider>,
  document.getElementById('root')
);
