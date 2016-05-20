import React from 'react';
import $ from 'assert';
import DatagridWrapper from '../src/datagrid-wrapper';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('DatagridWrapper', () => {
  let wrapper;
  let Child;
  let initDatagrid;
  beforeEach(() => {
    Child = () => <span/>;
    initDatagrid = spy();
  });

  it('should render without problems', () => {
    wrapper = shallow(<DatagridWrapper/>);
    $.ok(wrapper);
  });

  it('should call initDatagrid() when no Component passed', () => {
    wrapper = shallow(<DatagridWrapper initDatagrid={initDatagrid} Component={undefined}/>);
    wrapper.instance().componentDidMount();
    $.ok(initDatagrid.calledOnce);
  });

  it('should not call initDatagrid() when a Component is passed', () => {
    wrapper = shallow(<DatagridWrapper initDatagrid={initDatagrid} Component={Child}/>);
    wrapper.instance().componentDidMount();
    $.equal(initDatagrid.callCount, 0);
  });

  it('should render Component when passed', () => {
    wrapper = shallow(<DatagridWrapper initDatagrid={initDatagrid} Component={Child}/>);
    $.equal(wrapper.find(Child).length, 1);
  });

  it('should pass through all extra props to Component', () => {
    wrapper = shallow(<DatagridWrapper
      initDatagrid={() => {}}
      Component={Child} foo="foo" bar="bar"/>);
    const childProps = wrapper.find(Child).props();
    $.deepEqual(childProps, {
      foo: 'foo',
      bar: 'bar',
      datagrid: childProps.datagrid,
    });
  });
});
