import { handleActions } from 'redux-actions';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants';
import { Map } from 'immutable';

const counterReducer = handleActions({
  [INCREMENT_COUNTER]: (state) => state.update('count', (value) => value + 1),
  [DECREMENT_COUNTER]: (state) => state.update('count', (value) => value - 1),
}, Map({ count: 0 }));

export default counterReducer;
