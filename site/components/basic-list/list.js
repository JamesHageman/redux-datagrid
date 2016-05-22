import React from 'react';
import { reduxDatagrid } from 'redux-datagrid';

const itemClass = 'p1 mb1 border rounded bg-white flex items-center max-width-1';

const BasicList = ({ datagrid: { data, filtered, controls: { search, sortBy, sortDirection } }}) => <div>

  <div>
    <input
      className="p1 mr1"
      placeholder="Search"
      {...search}/>
    Showing {filtered.length} / {data.length}
  </div>

  <div>
    Sort By
    <select
      className="ml1"
      {...sortBy}>
      <option value="">None</option>
      <option value="email">Email</option>
    </select>
  </div>

  <div>
    Sort Direction
    <select
      className="ml1"
      {...sortDirection}>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>

  <ul className="list-reset">
    { filtered.map(row =>
      <li key={row._id} className={itemClass}>
        <img src={row.picture} className="mr1"/>
        <div className="mr1 flex-auto">{row.email}</div>
      </li>
    )}
  </ul>
</div>;

export default reduxDatagrid({
  name: 'basic-list',
  columns: [
    'email',
  ],
})(BasicList);
