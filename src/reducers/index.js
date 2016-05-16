import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import session from './session';
import datagrid from './datagrid';

const rootReducer = combineReducers({
  session,
  counter,
  datagrid,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
