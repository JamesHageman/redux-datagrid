import { handleActions } from 'redux-actions';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../constants';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  username: null,
  hasError: false,
  isLoading: false,
});

const userReducer = handleActions({
  [LOGIN_USER_PENDING]: (state) => state.merge({
    username: null,
    hasError: false,
    isLoading: true,
  }),
  [LOGIN_USER_SUCCESS]: (state, { payload }) => state.merge({
    username: payload,
    hasError: false,
    isLoading: false,
  }),
  [LOGIN_USER_ERROR]: (state) => state.merge({
    hasError: true,
    isLoading: false,
  }),
  [LOGOUT_USER]: (state) => state.merge({
    hasError: false,
    isLoading: false,
    username: null,
  }),
}, INITIAL_STATE);

export default userReducer;
