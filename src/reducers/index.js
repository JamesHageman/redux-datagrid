import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import user from './user';

const rootReducer = combineReducers({
  user,
  counter,
  router: routerStateReducer,
});

export default rootReducer;
