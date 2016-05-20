import React from 'react';
import { FlexTable, FlexColumn, AutoSizer } from 'react-virtualized';
import { reduxDatagrid } from 'redux-datagrid';
import '!!style!css!react-virtualized/styles.css';

const BasicTable = ({ datagrid: { data, filtered, columns, controls: { search, sortBy } }}) =>
  <div>
    <input
      className="p1 mr1"
      placeholder="Search"
      {...search}/>

    Showing {filtered.length} / {data.length} items
    <AutoSizer disableHeight>{({ width }) =>
      <FlexTable
        rowCount={filtered.length}
        rowGetter={({index}) => filtered[index]}
        rowHeight={50}
        headerHeight={50}
        width={Math.max(width, 600)}
        height={400}
        sortBy={sortBy.value}
        sort={handleSort(sortBy.onChange)}>
        { columns.map(col =>
          <FlexColumn
            key={col.dataKey}
            dataKey={col.dataKey}
            width={200}
            flexGrow={1}
            name={col.dataKey}
            label={col.dataKey}/>
        )}
      </FlexTable>
    }</AutoSizer>
  </div>;

function handleSort(onChange) {
  return ({ sortBy }) => {
    onChange({ target: { value: sortBy }}); // event hack
  };
}

export default reduxDatagrid({
  name: 'basic-table',
  columns: [
    'email',
    'company',
    'address',
    'phone',
    'age',
    {
      dataKey: 'decade',
      cellDataGetter: (row) => Math.floor(row.age / 10) * 10,
    },
  ],
})(BasicTable);
