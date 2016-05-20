import { createSelector } from 'reselect';

const columnDefaults = {
  cellDataGetter: (row, dataKey) => row[dataKey],
};

const searchIndex = columns => (object) => {
  return columns.reduce((words, col) => {
    const s = col.cellDataGetter(object, col.dataKey);
    if (!s) {
      return words;
    }

    return words + ' ' + s.toString().trim().toLowerCase();
  }, '');
};

function findColumn(dataKey, columns) {
  if (!dataKey) {
    return null;
  }

  const n = columns.length;

  for (let i = 0; i < n; i++) {
    if (columns[i].dataKey === dataKey) {
      return columns[i];
    }
  }

  return null;
}

const createDefaultPropSelector = (stateKey, propKey, defaultValue ) => ({ state, props }) => {
  if (state[stateKey]) {
    return state[stateKey];
  }

  if (props[propKey]) {
    return props[propKey];
  }

  return defaultValue;
};

const columnsInputSelector = ({ props, options }) => {
  if (props.columns) {
    return props.columns;
  }

  if (options.columns) {
    return options.columns;
  }

  throw new Error(`Redux Datagrid must be passed "columns" either
   as props or in createConnectedGrid()`);
};

export function createSelectors() {
  const columnsSelector = createSelector(
    columnsInputSelector,
    columnDefs => columnDefs.map(col => {
      if (typeof col === 'string') {
        return {
          ...columnDefaults,
          dataKey: col,
        };
      }

      if (!col || !col.dataKey || typeof col.dataKey !== 'string') {
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

  const sortBySelector = createDefaultPropSelector('sortBy', 'defaultSortBy', '');

  const sortByColumnSelector = createSelector(
    sortBySelector,
    columnsSelector,
    findColumn
  );

  const groupBySelector = createDefaultPropSelector('groupBy', 'defaultGroupBy', '');

  const groupByColumnSelector = createSelector(
    groupBySelector,
    columnsSelector,
    findColumn
  );

  const sortedDataSelector = createSelector(
    sortByColumnSelector,
    dataSelector,
    (sortByColumn, data) => {
      if (sortByColumn === null) {
        return data;
      }

      return data.slice().sort((a, b) => {
        const aa = sortByColumn.cellDataGetter(a, sortByColumn.dataKey);
        const bb = sortByColumn.cellDataGetter(b, sortByColumn.dataKey);

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
      const index = searchIndex(columns);
      return data.reduce((acc, object) => {
        acc.push(index(object));
        return acc;
      }, []);
    },
  );

  const filteredDataSelector = createSelector(
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

  const groupedDataSelector = createSelector(
    groupByColumnSelector,
    filteredDataSelector,
    (groupByColumn, data) => {
      if (groupByColumn === null) {
        return null;
      }

      return data.reduce((groups, object) => {
        const key = groupByColumn.cellDataGetter(object, groupByColumn.dataKey);
        if (!groups[key]) {
          groups[key] = [object];
        } else {
          groups[key].push(object);
        }

        return groups;
      }, {});
    }
  );

  return {
    columnsSelector,
    filteredDataSelector,
    groupedDataSelector,
    sortBySelector,
    groupBySelector,
  };
}
