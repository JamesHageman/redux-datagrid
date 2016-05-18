import React from 'react';
import { reduxDatagrid } from '../../../src';

const { func, array, string, object } = React.PropTypes;

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
      <h3>Data:</h3>
      <pre>{JSON.stringify(data, 0, 2)}</pre>
      <h3>Grouped:</h3>
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

export default reduxDatagrid({
  name: 'my-grid',
  columns: [
    { dataKey: 'name' },
    { dataKey: 'type' },
  ],
})(Datagrid);
