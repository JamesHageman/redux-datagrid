import { connect } from 'react-redux';
import { createSelectors } from './selectors';
import DatagridWrapper from './datagrid-wrapper';

const targetValueChangeAction = (actionType, name) => (e) => ({
  type: `redux-datagrid/${ actionType }`,
  payload: {
    name: name,
    value: e.target.value,
  },
});

const createConnectedGrid = ({ name, columns }, Component) => {
  const {
    filteredDataSelector,
    groupedDataSelector,
    columnsSelector,
    sortBySelector,
    groupBySelector,
  } = createSelectors();

  return connect((state, props) => {
    const gridState = state.datagrid[name];

    if (!gridState) {
      return {};
    }

    const selectorData = {
      state: gridState,
      props: props,
      options: { name, columns },
    };

    return {
      filteredData: filteredDataSelector(selectorData),
      groupedData: groupedDataSelector(selectorData),
      columns: columnsSelector(selectorData),
      sortBy: sortBySelector(selectorData),
      groupBy: groupBySelector(selectorData),
      sortDirection: gridState.sortDirection,
      fullData: props.data,
      name: name,
      searchText: gridState.searchText,
      Component: Component,
    };
  }, {
    handleSearchTextChange: targetValueChangeAction('CHANGE_SEARCH_TEXT', name),
    handleGroupByChange: targetValueChangeAction('CHANGE_GROUP_BY', name),
    handleSortByChange: targetValueChangeAction('CHANGE_SORT_BY', name),
    handleSortDirectionChange: targetValueChangeAction('CHANGE_SORT_DIRECTION', name),
    initDatagrid: () => ({
      type: 'redux-datagrid/INIT',
      payload: { name },
    }),
  })(DatagridWrapper);
};


const reduxDatagrid = (options) => GridComponent =>
  createConnectedGrid(options, GridComponent);

export default reduxDatagrid;
