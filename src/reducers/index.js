
import { combineReducers } from 'redux';

import nav from './nav';
import user from './user';
import listing from './listing';
import host from './host';

export default combineReducers({
  nav,
  user,
  listing,
  host,
});
