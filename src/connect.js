import { connect } from 'react-redux';
import DatagridWrapper from './datagrid-wrapper';

const createConnectedGrid = ({ name }, Component) => connect(
(state, props) => {
  const gridState = state.datagrid[name];

  if (!gridState) {
    return {};
  }

  const selectorData = {
    state: gridState,
    props: props,
    options: { name, columns: [ 'name', 'type' ] },
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


const reduxDatagrid = ({ name }) => GridComponent =>
  createConnectedGrid({ name }, GridComponent);

export default reduxDatagrid;
