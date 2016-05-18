import { createSelector } from 'reselect';

const columnDefaults = {
  cellDataGetter: (row, dataKey) => row[dataKey],
};

const searchIndex = columns => (object = {}) => {
  return columns.map((col, i) =>
    col.cellDataGetter(object, col.dataKey, i)
  ).filter(s => !!s).map(s => s.toString().trim().toLowerCase())
    .join(' ');
};

const columnsInputSelector = ({ props, options }) => {
  if (props.columns) {
    return props.columns;
  }

  if (options.columns) {
    return options.columns;
  }

  throw new Error(`Redux Datagrid "${name}" must be passed "columns" either
   as props or in createConnectedGrid()`);
};

const columnsSelector = createSelector(columnsInputSelector,
  columnDefs => columnDefs.map(col => {
    if (typeof col === 'string') {
      return {
        ...columnDefaults,
        dataKey: col,
      };
    }

    if (!col.dataKey || typeof col.dataKey !== 'string') {
      throw new Error(`Columns defs must either be a string or an object with
                      a dataKey string`);
    }

    return {
      ...columnDefaults,
      ...col,
    };
  })
);

const searchTextSelector = ({ state }) => state.searchText;
const searchTermSelector = createSelector(
  searchTextSelector, text => text.trim().toLowerCase()
);
const dataSelector = ({ props }) => props.data;

const createDefaultPropSelector = (stateKey, propKey) => ({ state, props }) => {
  if (state[stateKey]) {
    return state[stateKey];
  }

  if (props[propKey]) {
    return props[propKey];
  }

  return null;
};

const sortBySelector = createDefaultPropSelector('sortBy', 'defaultSortBy');
const groupBySelector = createDefaultPropSelector('groupBy', 'defaultGroupBy');

const sortedDataSelector = createSelector(
  sortBySelector,
  dataSelector,
  (sortBy, data) => {
    if (sortBy === null) {
      return data;
    }

    return data.slice().sort((a, b) => {
      const aa = a[sortBy];
      const bb = b[sortBy];

      if (aa === bb) {
        return 0;
      }

      return aa > bb ? 1 : -1;
    });
  }
);

const dataWordIndexSelector = createSelector(
  sortedDataSelector,
  columnsSelector,
  (data, columns) => {
    return data.map(searchIndex(columns));
  },
);

export const filteredDataSelector = createSelector(
  sortedDataSelector,
  dataWordIndexSelector,
  searchTermSelector,
  (data, dataWords, searchText) => {
    if (!searchText) { return data; }

    return data.filter((row, i) => {
      return dataWords[i].search(searchText) >= 0;
    });
  }
);

export const groupedDataSelector = createSelector(
  groupBySelector,
  filteredDataSelector,
  (groupBy, data) => {
    if (groupBy === null) { return null; }

    return data.reduce((groups, object) => {
      const key = object[groupBy];
      if (!groups[key]) {
        groups[key] = [object];
      } else {
        groups[key].push(object);
      }

      return groups;
    }, {});
  }
);
