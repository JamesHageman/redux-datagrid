import {
  filteredDataSelector,
  groupedDataSelector,
} from '../src/selectors';
import $ from 'assert';

describe('selectors', () => {
  let input;
  let data;
  let columns;

  beforeEach(() => {
    columns = [ 'name', 'type' ];

    data = [
      { id: 1, name: 'apple', type: 'foo' },
      { id: 2, name: 'orange', type: 'foo' },
      { id: 3, name: 'banana', type: 'foo' },
      { id: 4, name: 'pineapple', type: 'bar' },
      { id: 5, name: 'strawberry', type: 'bar' },
    ];

    input = {
      props: {
        data,
      },
      state: {
        searchText: '',
        groupBy: null,
        sortBy: null,
      },
      options: { name: 'grid', columns },
    };
  });

  it('should throw when no columns passed', () => {
    $.throws(() => {
      delete data.options.columns;
      filteredDataSelector(data);
    }, 'Redux Datagrid "grid" must be passed "columns" either as props or in createConnectedGrid()');
  });

  describe('filteredDataSelector', () => {
    it('should do nothing when no searchText', () => {
      $.equal(filteredDataSelector(input), data);
    });

    it('can search by name', () => {
      input.state.searchText = 'banana';
      $.deepEqual(filteredDataSelector(input), [
        { id: 3, name: 'banana', type: 'foo' },
      ]);
    });

    it('can search by type', () => {
      input.state.searchText = 'foo';
      $.deepEqual(filteredDataSelector(input), [
        { id: 1, name: 'apple', type: 'foo' },
        { id: 2, name: 'orange', type: 'foo' },
        { id: 3, name: 'banana', type: 'foo' },
      ]);
    });

    it('can match partial strings', () => {
      input.state.searchText = 'appl';
      $.deepEqual(filteredDataSelector(input), [
        { id: 1, name: 'apple', type: 'foo' },
        { id: 4, name: 'pineapple', type: 'bar' },
      ]);
    });

    it('should ignore unspecified columns', () => {
      input.options.columns = [ 'name' ];
      input.state.searchText = 'foo';
      $.deepEqual(filteredDataSelector(input), []);
    });

    it('should sort by name', () => {
      input.props.defaultSortBy = 'name';
      $.deepEqual(filteredDataSelector(input), [
        { id: 1, name: 'apple', type: 'foo' },
        { id: 3, name: 'banana', type: 'foo' },
        { id: 2, name: 'orange', type: 'foo' },
        { id: 4, name: 'pineapple', type: 'bar' },
        { id: 5, name: 'strawberry', type: 'bar' },
      ]);
    });
  });

  describe('groupedDataSelector', () => {
    it('should return null when no groupBy', () => {
      $.strictEqual(groupedDataSelector(input), null);
    });

    it('should group by type', () => {
      input.state.groupBy = 'type';
      $.deepEqual(groupedDataSelector(input), {
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

    it('should encorporate searchText', () => {
      input.state.groupBy = 'type';
      input.state.searchText = 'appl';
      $.deepEqual(groupedDataSelector(input), {
        foo: [ { id: 1, name: 'apple', type: 'foo' } ],
        bar: [ { id: 4, name: 'pineapple', type: 'bar' } ],
      });
    });
  });
});
