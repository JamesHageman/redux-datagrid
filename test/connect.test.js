import React from 'react';
import $ from 'assert';
import reduxDatagrid from '../src/connect';
import { shallow } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import reducer from '../src/reducer';
import DatagridWrapper from '../src/datagrid-wrapper';
import { spy } from 'sinon';

describe('reduxDatagrid HOC', () => {
  let Grid;
  let ConnectedGrid;
  let store;
  let data;
  let columns;
  let wrapper;
  let options;

  function setup() {
    data = data || [
      { id: 1, name: 'apple', type: 'foo' },
      { id: 2, name: 'orange', type: 'foo' },
      { id: 3, name: 'banana', type: 'foo' },
      { id: 4, name: 'pineapple', type: 'bar' },
      { id: 5, name: 'strawberry', type: 'bar' },
    ];

    columns = columns || [ 'name', 'type' ];

    options = options || { name: 'grid', columns };

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

    ConnectedGrid = reduxDatagrid(options)(Grid);
    render();
  }

  function render() {
    wrapper = shallow(<ConnectedGrid store={store} data={data}/>);
  }

  beforeEach(() => {
    Grid = null;
    ConnectedGrid = null;
    store = null;
    data = null;
    columns = null;
    wrapper = null;
    options = null;
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

  // These tests also rely on the reducer working as expected

  it('should filter data', () => {
    setup();
    wrapper.prop('handleSearchTextChange').call(null, ({ target: { value: 'appl'}}));

    render();

    $.deepEqual(wrapper.prop('filteredData'), [
      { id: 1, name: 'apple', type: 'foo' },
      { id: 4, name: 'pineapple', type: 'bar' },
    ]);

    $.equal(wrapper.prop('fullData'), data);
  });

  it('should sort data', () => {
    setup();
    wrapper.prop('handleSortByChange').call(null, { target: { value: 'name' }});

    render();

    $.deepEqual(wrapper.prop('filteredData'), [
      { id: 1, name: 'apple', type: 'foo' },
      { id: 3, name: 'banana', type: 'foo' },
      { id: 2, name: 'orange', type: 'foo' },
      { id: 4, name: 'pineapple', type: 'bar' },
      { id: 5, name: 'strawberry', type: 'bar' },
    ]);
  });

  it('should group data', () => {
    setup();
    wrapper.prop('handleGroupByChange').call(null, { target: { value: 'type' }});

    render();
    $.deepEqual(wrapper.prop('groupedData'), {
      foo: [
        { id: 1, name: 'apple', type: 'foo' },
        { id: 2, name: 'orange', type: 'foo' },
        { id: 3, name: 'banana', type: 'foo' },
      ],
      bar: [
        { id: 4, name: 'pineapple', type: 'bar' },
        { id: 5, name: 'strawberry', type: 'bar' },
      ],
    });
  });

  it('should pass nothing from state when the grid hasn\'t been initialized', () => {
    options = { name: 'other-grid', columns };
    setup();
    $.deepEqual(wrapper.props(), {
      store,
      data,
      handleSearchTextChange: wrapper.prop('handleSearchTextChange'),
      handleGroupByChange: wrapper.prop('handleGroupByChange'),
      handleSortByChange: wrapper.prop('handleSortByChange'),
      initDatagrid: wrapper.prop('initDatagrid'),
    });
  });

  it('should fire the INIT action', () => {
    setup();
    spy(store, 'dispatch');
    $.deepEqual(wrapper.props().initDatagrid(), {
      type: 'redux-datagrid/INIT',
      payload: { name: 'grid' },
    });
  });
});
