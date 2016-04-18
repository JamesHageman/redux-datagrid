import assert from 'assert';
import { render } from 'enzyme';

import React from 'react';

import Modal from './modal';

describe('Modal Component', () => {
  it('should create a modal', () => {
    const wrapper = render(<Modal>Hello world</Modal>);
    assert.equal(wrapper.text(), 'Hello world');
  });
});
