import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import Input from './index';

describe('Input', () => {
  it('should create an input', () => {
    // Render the Input component
    const props = {
      type: 'password',
      placeholder: 'sample placeholder',
    };
    const wrapper = render(
      <div id="root">
        <Input { ...props } />
      </div>
    );
    assert.isOk(wrapper.children().length, 'Unable to render component');

    // Find the input
    const inputElement = wrapper.find('input');
    assert.isOk(inputElement, 'Unable to render input');

    // Validate the props were set
    assert.isNotNull(
      inputElement.attr('type'),
      'type-attribute not found'
    );
    assert.strictEqual(
      inputElement.attr('type'),
      props.type,
      'type-attribute has incorrect value'
    );
    assert.isNotNull(
      inputElement.attr('placeholder'),
      'placeholder-attribute not found'
    );
    assert.strictEqual(
      inputElement.attr('placeholder'),
      props.placeholder,
      'placeholder-attribute has incorrect value'
    );
  });
});
