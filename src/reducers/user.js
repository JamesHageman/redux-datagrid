import { handleActions } from 'redux-actions';
import { LOGIN_USER, LOGOUT_USER } from '../constants';
import { Map } from 'immutable';

const userReducer = handleActions({
  [LOGIN_USER]: (state, action) => state.merge({'username': action.payload}),
  [LOGOUT_USER]: (state) => state.merge({'username': null}),
}, Map({ username: null }));

export default userReducer;
