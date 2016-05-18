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

  it('should render Component when passed', () => {
    wrapper = shallow(<DatagridWrapper initDatagrid={initDatagrid} Component={Child}/>);
    $.equal(wrapper.find(Child).length, 1);
  });

  it('should pass through all extra props to Component', () => {
    wrapper = shallow(<DatagridWrapper
      initDatagrid={() => {}}
      Component={Child} foo="foo" bar="bar"/>);
    $.deepEqual(wrapper.find(Child).props(), {
      foo: 'foo',
      bar: 'bar',
    });
  });
});
