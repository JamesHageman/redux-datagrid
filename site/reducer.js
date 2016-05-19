import { combineReducers } from 'redux';
import { reducer as datagridReducer } from '../src';

export default combineReducers({
  datagrid: datagridReducer,
});
