import $ from 'assert';
import { reduxDatagrid, reducer } from '../src';

describe('index.js', () => {
  it('should export reduxDatagrid', () => {
    $.ok(reduxDatagrid);
  });

  it('should export reducer', () => {
    $.ok(reducer);
  });
});
