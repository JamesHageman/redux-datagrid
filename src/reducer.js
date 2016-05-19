import { createSelectors } from './selectors';

const initialState = {};

const initGridState = () => {
  const { filteredDataSelector, groupedDataSelector } = createSelectors();
  return {
    searchText: '',
    sortBy: null,
    groupBy: null,
    selectors: {
      visibleData: filteredDataSelector,
      groupedData: groupedDataSelector,
    },
  };
};

export default (state = initialState, action) => {
  if (!/redux-datagrid\//.test(action.type)) {
    return state;
  }

  const name = action.payload.name;

  if (action.type === 'redux-datagrid/INIT') {
    return {
      ...state,
      [name]: initGridState(),
    };
  }

  if (!state[name]) {
    throw new Error(`Action "${action.type}" called with uninitialized grid "${name}"`);
  }

  switch (action.type) {
  case 'redux-datagrid/CHANGE_SEARCH_TEXT':
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
