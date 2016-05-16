import { createSelector } from 'reselect';

const initialState = {};

function searchIndex(object = {}) {
  return Object.keys(object).map(key => object[key])
    .filter(val => typeof val === 'string')
    .map(val => val.trim().toLowerCase())
    .join(' ');
}

const searchTextSelector = (state) => state.searchText;
const searchTermSelector = createSelector(
  searchTextSelector, text => text.trim().toLowerCase()
);
const dataSelector = (state, props) => props.data;

const createDefaultPropSelector = (stateKey, propKey) => (state, props) => {
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
  data => {
    return data.map(searchIndex);
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

const initGridState = () => ({
  searchText: '',
  sortBy: null,
  groupBy: null,
  selectors: {
    visibleData: filteredDataSelector,
    groupedData: groupedDataSelector,
  },
});

export default (state = initialState, action) => {
  if (!/Datagrid\//.test(action.type)) {
    return state;
  }

  const name = action.payload.name;

  switch (action.type) {
  case 'Datagrid/INIT':
    return {
      ...state,
      [name]: initGridState(),
    };

  case 'Datagrid/CHANGE_SEARCH_TEXT':
    return {
      ...state,
      [name]: {
        ...state[name],
        searchText: action.payload.text,
      },
    };

  default:
    return state;
  }
};
