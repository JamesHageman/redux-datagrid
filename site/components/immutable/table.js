import React from 'react';
import { FlexTable, FlexColumn, AutoSizer } from 'react-virtualized';
import { reduxDatagrid } from 'redux-datagrid';
import '!!style!css!react-virtualized/styles.css';

const ImmutableTable = ({ datagrid: { data, filtered, columns, controls: { search, sortBy } }}) =>
  <div>
    <input
      className="p1 mr1"
      placeholder="Search"
      {...search}/>

    Showing {filtered.size} / {data.size} items
    <AutoSizer disableHeight>{({ width }) =>
      <FlexTable
        rowCount={filtered.size}
        rowGetter={({index}) => filtered.get(index)}
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

function immutableCellDataGetter(row, dataKey) {
  return row.get(dataKey);
}

export default reduxDatagrid({
  name: 'basic-table',
  // Note that we need to attach a cellDataGetter on each column so
  // redux-datagrid knows how to retrieve the data
  columns: [
    'email',
    'company',
    'address',
    'phone',
    'age',
  ].map(dataKey => {
    return {
      dataKey,
      cellDataGetter: immutableCellDataGetter,
    };
  }),
})(ImmutableTable);
