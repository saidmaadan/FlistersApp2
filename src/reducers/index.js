
import { combineReducers } from 'redux';

import nav from './nav';
import user from './user';
import listing from './listing';

export default combineReducers({
  nav,
  user,
  listing,
});
