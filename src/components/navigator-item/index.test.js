import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import NavigatorItem from './index';

describe('NavigatorItem', () => {
  it('should render a NavigationItem and its children', () => {
    const wrapper = render(<NavigatorItem>Hello world</NavigatorItem>);

    assert.isOk(wrapper.children().length, 'component not rendered');
    assert.strictEqual(wrapper.text(), 'Hello world',
      'child contents not found');
  });

  it('should be hidden', () => {
    const wrapper = render(<NavigatorItem isVisible={false}>Hello world</NavigatorItem>);

    assert.isOk(wrapper.find('.hide').length, '"hide" css class not found');
  });
});
