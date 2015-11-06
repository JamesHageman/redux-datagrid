import assert from 'assert';
import counterReducer from './counter';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants';
import { Map } from 'immutable';

let state = counterReducer(undefined, {});

describe('counter reducer', () => {
  describe('inital state', () => {
    it('should be a Map', () => {
      assert.strictEqual(Map.isMap(state), true);
    });
  });

  describe('on INCREMENT_COUNTER', () => {
    it('should increment state.count', () => {
      const previousValue = state.get('count');
      state = fireAction(INCREMENT_COUNTER, state);
      assert.strictEqual(previousValue + 1, state.get('count'));
    });
  });

  describe('on DECREMENT_COUNTER', () => {
    it('should decrement state.count', () => {
      const previousValue = state.get('count');
      state = fireAction(DECREMENT_COUNTER, state);
      assert.strictEqual(previousValue - 1, state.get('count'));
    });
  });
});

function fireAction(actionType, currentState) {
  return counterReducer(currentState, {
    type: actionType,
  });
}