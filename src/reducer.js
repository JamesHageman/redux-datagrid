const initialState = {};

const initGridState = () => {
  return {
    searchText: '',
    sortBy: '',
    groupBy: '',
    sortDirection: 'asc', // 'asc' | 'desc'
  };
};

function getSortDirection(value) {
  const s = value.toLowerCase();
  if (s === 'asc' || s === 'desc') {
    return s;
  }

  throw new Error(`"${value}" is not a valid sort direction, please use "asc" or "desc"`);
}

function update({ state, name, key, value }) {
  return {
    ...state,
    [name]: {
      ...state[name],
      [key]: value,
    },
  };
}

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
    return update({
      state,
      name,
      key: 'searchText',
      value: action.payload.value,
    });

  case 'redux-datagrid/CHANGE_SORT_BY':
    return update({
      state,
      name,
      key: 'sortBy',
      value: action.payload.value,
    });

  case 'redux-datagrid/CHANGE_GROUP_BY':
    return update({
      state,
      name,
      key: 'groupBy',
      value: action.payload.value,
    });

  case 'redux-datagrid/CHANGE_SORT_DIRECTION':
    return update({
      state,
      name,
      key: 'sortDirection',
      value: getSortDirection(action.payload.value),
    });

  default:
    return state;
  }
};
