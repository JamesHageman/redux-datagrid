const initialState = {};

const initGridState = () => {
  return {
    searchText: '',
    sortBy: null,
    groupBy: null,
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

  case 'redux-datagrid/CHANGE_SORT_BY':
    return {
      ...state,
      [name]: {
        ...state[name],
        sortBy: action.payload.value,
      },
    };

  case 'redux-datagrid/CHANGE_GROUP_BY':
    return {
      ...state,
      [name]: {
        ...state[name],
        groupBy: action.payload.value,
      },
    };

  default:
    return state;
  }
};
