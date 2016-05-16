import React from 'react';
import { connect } from 'react-redux';

const { func, array, string, object, arrayOf } = React.PropTypes;

const createConnectedGrid = ({ name }, Component) => connect(({ datagrid }, props) => {
  const gridState = datagrid[name];

  if (!gridState) {
    return {};
  }

  return {
    data: gridState.selectors.visibleData(gridState, props),
    groupedData: gridState.selectors.groupedData(gridState, props),
    fullData: props.data,
    name: name,
    searchText: gridState.searchText,
    Component: Component,
  };
}, {
  handleSearchTextChange: (e) => ({
    type: 'Datagrid/CHANGE_SEARCH_TEXT',
    payload: { name, text: e.target.value },
  }),
  initDatagrid: () => ({
    type: 'Datagrid/INIT',
    payload: { name },
  }),
})(DatagridWrapper);

class DatagridWrapper extends React.Component {
  static propTypes = {
    Component: func,
    initDatagrid: func,
    data: arrayOf(object.isRequired).isRequired,
    defaultSortBy: string,
    defaultGroupBy: string,
  }

  componentDidMount() {
    if (!this.props.Component) {
      this.props.initDatagrid();
    }
  }

  render() {
    const {
      Component,
      ...otherProps,
    } = this.props;

    if (!Component) {
      return null;
    }

    return <Component {...otherProps}/>;
  }
}

const connectDatagrid = ({ name }) => GridComponent =>
  createConnectedGrid({ name }, GridComponent);

const Datagrid = ({
  data,
  name,
  searchText,
  handleSearchTextChange,
  fullData,
  groupedData,
}) => {
  return (
    <div>
      <p>Grid: {name}</p>
      <input value={searchText} onChange={handleSearchTextChange}/>
      <p>{ searchText && `Searching for ${searchText}`}</p>
      <p>Showing { data.length } / { fullData.length }</p>
      <pre>{JSON.stringify(data, 0, 2)}</pre>
      <pre>{JSON.stringify(groupedData, 0, 2)}</pre>
    </div>
  );
};

Datagrid.propTypes = {
  data: array,
  fullData: array,
  groupedData: object,
  name: string,
  searchText: string,
  handleSearchTextChange: func,
};

export default connectDatagrid({
  name: 'my-grid',
})(Datagrid);
