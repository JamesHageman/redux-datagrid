import assert from 'assert';
import reducer from '../src/reducer';

describe('reduxDatagrid reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { type: 'redux-datagrid/INIT', payload: {
      name: 'test-grid',
    }});
  });

  it('should return inital state', () => {
    assert.deepEqual(reducer(undefined, {}), {});
  });

  it('should init a grid at the right key', () => {
    assert.ok(state['test-grid']);
    assert.deepEqual(state, {
      'test-grid': {
        ...state['test-grid'],
        searchText: '',
        groupBy: null,
        sortBy: null,
      },
    });
  });

  it('should change searchText', () => {
    assert.equal(state['test-grid'].searchText, '');
    state = reducer(state, {
      type: 'redux-datagrid/CHANGE_SEARCH_TEXT',
      payload: {
        name: 'test-grid',
        text: 'foo',
      },
    });

    assert.equal(state['test-grid'].searchText, 'foo');
  });

  it('should throw when passed an uninitialized grid', () => {
    assert.throws(() => {
      reducer(state, {
        type: 'redux-datagrid/CHANGE_SEARCH_TEXT',
        payload: {
          name: 'bad-grid',
          text: 'foo',
        },
      });
    }, 'Action "redux-datagrid/CHANGE_SEARCH_TEXT" called with uninitialized grid "bad-grid"');
  });

  // console.log(assert);
});
