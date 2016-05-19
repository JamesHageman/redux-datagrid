import {
  filteredDataSelector,
  groupedDataSelector,
} from '../src/selectors';
import $ from 'assert';
import { fromJS } from 'immutable';

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

  describe('filteredDataSelector', () => {
    it('should throw when no columns passed', () => {
      input.options.columns = undefined;

      $.ok(!input.options.columns);
      $.ok(!input.props.columns);

      $.throws(() => {
        filteredDataSelector(input);
      }, Error);
    });

    it('should throw when invalid columns passed', () => {
      input.options.columns = [{}];
      $.throws(() => {
        filteredDataSelector(input);
      }, Error);
    });

    it('should throw when dataKey is not a string', () => {
      input.options.columns = [{ dataKey: 5 }];
      $.throws(() => {
        filteredDataSelector(input);
      }, Error);
    });

    it('should do nothing when no searchText', () => {
      $.strictEqual(filteredDataSelector(input), data);
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

    it('also works when passed columns as props', () => {
      delete input.options.columns;
      input.props.columns = columns;
      input.state.searchText = 'foo';
      $.deepEqual(filteredDataSelector(input), [
        { id: 1, name: 'apple', type: 'foo' },
        { id: 2, name: 'orange', type: 'foo' },
        { id: 3, name: 'banana', type: 'foo' },
      ]);
    });

    it('works with object columns', () => {
      input.options.columns = [ { dataKey: 'name' }, 'type' ];
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

    it('should do a stable sort', () => {
      input.state.sortBy = 'name';
      input.props.data.push({ id: 6, name: 'apple', type: 'baz '});
      $.deepEqual(filteredDataSelector(input), [
        { id: 1, name: 'apple', type: 'foo' },
        { id: 6, name: 'apple', type: 'baz '},
        { id: 3, name: 'banana', type: 'foo' },
        { id: 2, name: 'orange', type: 'foo' },
        { id: 4, name: 'pineapple', type: 'bar' },
        { id: 5, name: 'strawberry', type: 'bar' },
      ]);
    });

    it('should not modify data when an unknown sortBy is passed', () => {
      input.state.sortBy = 'unknownProperty';
      $.strictEqual(filteredDataSelector(input), data);
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

  describe('with Immutable', () => {
    const immutableDataGetter = (row, dataKey) => row.get(dataKey);

    beforeEach(() => {
      data = fromJS(data);
      input.props.data = data;
    });

    it('passes immutable data through', () => {
      $.strictEqual(filteredDataSelector(input), data);
    });

    context('with proper columns', () => {
      beforeEach(() => {
        input.options.columns = [{
          dataKey: 'name',
          cellDataGetter: immutableDataGetter,
        }, {
          dataKey: 'type',
          cellDataGetter: immutableDataGetter,
        }];
      });

      it('should sort immutable data with a cellDataGetter', () => {
        input.state.sortBy = 'name';

        $.deepEqual(filteredDataSelector(input).toJS(), [
          { id: 1, name: 'apple', type: 'foo' },
          { id: 3, name: 'banana', type: 'foo' },
          { id: 2, name: 'orange', type: 'foo' },
          { id: 4, name: 'pineapple', type: 'bar' },
          { id: 5, name: 'strawberry', type: 'bar' },
        ]);
      });

      it('should search by name', () => {
        input.state.searchText = 'banana';
        $.deepEqual(filteredDataSelector(input).toJS(), [
          { id: 3, name: 'banana', type: 'foo' },
        ]);
      });

      it('should group by type', () => {
        input.state.groupBy = 'type';
        const groups = groupedDataSelector(input);
        $.ok(groups);

        $.deepEqual(groups.foo.map(x => x.toJS()), [
          { id: 1, name: 'apple', type: 'foo' },
          { id: 2, name: 'orange', type: 'foo' },
          { id: 3, name: 'banana', type: 'foo' },
        ]);

        $.deepEqual(groups.bar.map(x => x.toJS()), [
          { id: 4, name: 'pineapple', type: 'bar' },
          { id: 5, name: 'strawberry', type: 'bar' },
        ]);
      });
    });
  });
});
