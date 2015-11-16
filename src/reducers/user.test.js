import assert from 'assert';
import userReducer from './user';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../constants';

import { Map } from 'immutable';

let state = userReducer(undefined, {});

describe('user reducer', () => {
  describe('inital state', () => {
    it('should be a Map', () => {
      assert.strictEqual(Map.isMap(state), true);
    });
  });

  describe('on LOGIN_USER_PENDING', () => {
    it('should set loading to true', () => {
      state = fireAction(userReducer, state, LOGIN_USER_PENDING);
      assert(state.get('isLoading'));
      assert(state.get('username') === null);
    });
  });

  describe('on LOGIN_USER_SUCCESS', () => {
    it('should save the username', () => {
      state = fireAction(userReducer, state, LOGIN_USER_SUCCESS, 'Test');

      assert(!state.get('isLoading'));
      assert(!state.get('hasError'));
      assert(state.get('username') === 'Test');
    });
  });

  describe('on LOGIN_USER_ERROR', () => {
    it('should save the username', () => {
      state = fireAction(userReducer, state, LOGIN_USER_ERROR);

      assert(!state.get('isLoading'));
      assert(state.get('hasError'));
    });
  });


  describe('on LOGOUT_USER', () => {
    it('should save the username', () => {
      state = fireAction(userReducer, state, LOGOUT_USER);

      assert(!state.get('isLoading'));
      assert(!state.get('hasError'));
      assert(state.get('username') === null);
    });
  });
});

// TODO: Move this to a test utilities file
function fireAction(reducer, currentState, type, payload = {}) {
  return reducer(currentState, {
    type,
    payload,
  });
}
