import assert from 'assert';
import fireAction from '../utils/fire-action';
import sessionReducer from '../reducers/session';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../../src/constants/index';

import { Map } from 'immutable';

let state = sessionReducer(undefined, {});

describe('Session Reducer', () => {
  describe('inital state', () => {
    it('should be a Map', () => {
      assert.strictEqual(Map.isMap(state), true);
    });
  });

  describe('on LOGIN_USER_PENDING', () => {
    it('should set loading to true', () => {
      state = fireAction(sessionReducer, state, LOGIN_USER_PENDING);
      assert(state.get('isLoading'));
      assert(state.get('token') === null);
    });
  });

  describe('on LOGIN_USER_SUCCESS', () => {
    it('should save the username', () => {
      state = fireAction(sessionReducer, state, LOGIN_USER_SUCCESS, { token: 1234 });

      assert(!state.get('isLoading'));
      assert(!state.get('hasError'));
      assert(state.get('token') === 1234);
    });
  });

  describe('on LOGIN_USER_ERROR', () => {
    it('should save the username', () => {
      state = fireAction(sessionReducer, state, LOGIN_USER_ERROR);

      assert(!state.get('isLoading'));
      assert(state.get('hasError'));
    });
  });


  describe('on LOGOUT_USER', () => {
    it('should save the username', () => {
      state = fireAction(sessionReducer, state, LOGOUT_USER);

      assert(!state.get('isLoading'));
      assert(!state.get('hasError'));
      assert(state.get('token') === null);
    });
  });
});
