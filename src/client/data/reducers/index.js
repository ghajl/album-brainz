import { combineReducers } from 'redux';
import user from './user';
import albums from './albums';
import album from './album';

const rootReducer = combineReducers({
  user,
  albums,
  album
});

export default rootReducer;
