import React from 'react';
import { reduxDatagrid } from '../../../src';

const BasicList = ({ fullData, data, searchText, handleSearchTextChange }) => <div>
  <input
    className="p1 mr1"
    placeholder="search..."
    value={searchText} onChange={handleSearchTextChange}/>
  Showing {data.length} / {fullData.length}
  <ul className="list-reset">
    { data.map(row =>
      <li key={row._id} className="p1 mb1 border rounded flex items-center">
        <img src={row.picture} className="mr1"/>
        <div className="mr1 flex-auto">{row.email}</div>
        <div>{row.company}</div>
      </li>
    )}
  </ul>
</div>;

export default reduxDatagrid({
  name: 'basic-list',
  columns: [
    'email',
    'company',
  ],
})(BasicList);
