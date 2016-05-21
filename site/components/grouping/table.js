import React from 'react';
import { FlexTable, FlexColumn, AutoSizer } from 'react-virtualized';
import { reduxDatagrid } from 'redux-datagrid';
import '!!style!css!react-virtualized/styles.css';

const GroupingTable = ({ datagrid: { data, columns, grouped, controls: { groupBy, search }}}) => {
  return <div>
    <input
      className="p1"
      placeholder="Search"
      {...search}/>
    <span className="mx1">Group by</span>
    <select {...groupBy}>
      { columns.map(col => <option key={col.dataKey} value={col.dataKey}>{col.dataKey}</option>)}
    </select>
    <AutoSizer disableHeight>{({ width }) =>
      Object.keys(grouped).map(group =>
        <div key={group}>
          <h3>{ group }</h3>
          <FlexTable
            rowCount={grouped[group].length}
            rowGetter={({index}) => grouped[group][index]}
            rowHeight={50}
            headerHeight={50}
            width={Math.max(width, 600)}
            height={400}>
            { columns.filter(c => c.dataKey !== groupBy.value).map(col =>
              <FlexColumn
                key={col.dataKey}
                dataKey={col.dataKey}
                width={200}
                flexGrow={1}
                name={col.dataKey}
                label={col.dataKey}/>
            )}
          </FlexTable>
        </div>
      )
    }</AutoSizer>
  </div>;
};

export default reduxDatagrid({
  name: 'basic-table',
  columns: [
    'email',
    'age',
    'eyeColor',
    'favoriteFruit',
  ],
})(GroupingTable);
