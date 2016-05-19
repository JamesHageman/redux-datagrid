import { connect } from 'react-redux';
import DatagridWrapper from './datagrid-wrapper';

const createConnectedGrid = ({ name, columns }, Component) => connect(
(state, props) => {
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
    data: gridState.selectors.visibleData(selectorData),
    groupedData: gridState.selectors.groupedData(selectorData),
    fullData: props.data,
    name: name,
    searchText: gridState.searchText,
    Component: Component,
  };
}, {
  handleSearchTextChange: (e) => ({
    type: 'redux-datagrid/CHANGE_SEARCH_TEXT',
    payload: { name, text: e.target.value },
  }),
  initDatagrid: () => ({
    type: 'redux-datagrid/INIT',
    payload: { name },
  }),
})(DatagridWrapper);


const reduxDatagrid = (options) => GridComponent =>
  createConnectedGrid(options, GridComponent);

export default reduxDatagrid;
