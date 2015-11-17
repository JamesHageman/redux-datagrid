import { handleActions } from 'redux-actions';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants';
import { fromJS } from 'immutable';

const counterReducer = handleActions({
  [INCREMENT_COUNTER]: (state) =>
    state.update('count', (value) =>
      value + 1),
  [DECREMENT_COUNTER]: (state) =>
    state.update('count', (value) =>
      value - 1),
}, fromJS({
  count: 0,
}));

export default counterReducer;
