import { filteredDataSelector, groupedDataSelector } from './selectors';

const initialState = {};

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
  if (!/redux-datagrid\//.test(action.type)) {
    return state;
  }

  const name = action.payload.name;

  switch (action.type) {
  case 'redux-datagrid/INIT':
    return {
      ...state,
      [name]: initGridState(),
    };

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
