import $ from 'assert';
import reducer from '../src/reducer';

describe('reduxDatagrid reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { type: 'redux-datagrid/INIT', payload: {
      name: 'test-grid',
    }});
  });

  it('should return inital state', () => {
    $.deepEqual(reducer(undefined, {}), {});
  });

  it('should init a grid at the right key', () => {
    $.ok(state['test-grid']);
    $.deepEqual(state, {
      'test-grid': {
        ...state['test-grid'],
        searchText: '',
        groupBy: '',
        sortBy: '',
      },
    });
  });

  it('should change searchText', () => {
    $.equal(state['test-grid'].searchText, '');
    state = reducer(state, {
      type: 'redux-datagrid/CHANGE_SEARCH_TEXT',
      payload: {
        name: 'test-grid',
        value: 'foo',
      },
    });

    $.equal(state['test-grid'].searchText, 'foo');
  });

  it('should throw when passed an uninitialized grid', () => {
    $.throws(() => {
      reducer(state, {
        type: 'redux-datagrid/CHANGE_SEARCH_TEXT',
        payload: {
          name: 'bad-grid',
          value: 'foo',
        },
      });
    }, 'Action "redux-datagrid/CHANGE_SEARCH_TEXT" called with uninitialized grid "bad-grid"');
  });

  it('should return state when called with an unknow redux-datagrid action', () => {
    const newState = reducer(state, {
      type: 'redux-datagrid/OTHER_FUNC',
      payload: { name: 'test-grid' },
    });

    $.strictEqual(newState, state);
  });

  it('should set the sort direction to asc', () => {
    const newState = reducer(state, {
      type: 'redux-datagrid/CHANGE_SORT_DIRECTION',
      payload: { name: 'test-grid', value: 'asc' },
    });

    $.deepEqual(newState, {
      'test-grid': {
        ...state['test-grid'],
        sortDirection: 'asc',
      },
    });
  });

  it('should set the sort direction to desc', () => {
    const newState = reducer(state, {
      type: 'redux-datagrid/CHANGE_SORT_DIRECTION',
      payload: { name: 'test-grid', value: 'desc' },
    });

    $.deepEqual(newState, {
      'test-grid': {
        ...state['test-grid'],
        sortDirection: 'desc',
      },
    });
  });

  it('should allow case-insensitive sort direction', () => {
    const newState = reducer(state, {
      type: 'redux-datagrid/CHANGE_SORT_DIRECTION',
      payload: { name: 'test-grid', value: 'Desc' },
    });

    $.deepEqual(newState, {
      'test-grid': {
        ...state['test-grid'],
        sortDirection: 'desc',
      },
    });
  });

  it('should throw when an invalid sort direction is passed', () => {
    $.throws(() => {
      reducer(state, {
        type: 'redux-datagrid/CHANGE_SORT_DIRECTION',
        payload: { name: 'test-grid', value: 'bar' },
      });
    }, Error);
  });
});
