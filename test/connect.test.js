import React from 'react';
import $ from 'assert';
import reduxDatagrid from '../src/connect';
import { shallow } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import reducer from '../src/reducer';
import DatagridWrapper from '../src/datagrid-wrapper';

describe('reduxDatagrid HOC', () => {
  let Grid;
  let ConnectedGrid;
  let store;
  let data;
  let columns;
  let wrapper;

  function render() {
    wrapper = shallow(<ConnectedGrid store={store} data={data}/>);
  }

  function setup() {
    data = data || [
      { id: 1, name: 'apple', type: 'foo' },
      { id: 2, name: 'orange', type: 'foo' },
      { id: 3, name: 'banana', type: 'foo' },
      { id: 4, name: 'pineapple', type: 'bar' },
      { id: 5, name: 'strawberry', type: 'bar' },
    ];

    columns = columns || [ 'name', 'type' ];

    store = createStore(combineReducers({
      datagrid: reducer,
    }));

    store.dispatch({
      type: 'redux-datagrid/INIT',
      payload: { name: 'grid' },
    });

    Grid = () => {
      return <span/>;
    };

    ConnectedGrid = reduxDatagrid({ name: 'grid', columns })(Grid);
    render();
  }

  beforeEach(() => {
    Grid = null;
    ConnectedGrid = null;
    store = null;
    data = null;
    columns = null;
    wrapper = null;
  });

  it('should return a component', () => {
    setup();
    $.ok(ConnectedGrid);
  });

  it('should render without problems', () => {
    setup();
    $.ok(wrapper);
    $.equal(wrapper.type(), DatagridWrapper);
  });

  it('should pass through the data', () => {
    setup();
    $.equal(wrapper.prop('data'), data);
    $.equal(wrapper.prop('fullData'), data);
  });

  it('should filter data', () => {
    setup();
    wrapper.prop('handleSearchTextChange').call(null, ({ target: { value: 'appl'}}));

    render();

    $.deepEqual(wrapper.prop('data'), [
      { id: 1, name: 'apple', type: 'foo' },
      { id: 4, name: 'pineapple', type: 'bar' },
    ]);

    $.equal(wrapper.prop('fullData'), data);
  });
});
