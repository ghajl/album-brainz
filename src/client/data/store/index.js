import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const configureStore = preloadedState => {
  const middleware = [thunk];
  const store = createStore(reducer, preloadedState, applyMiddleware(...middleware));
  return store;
};

export default configureStore;
