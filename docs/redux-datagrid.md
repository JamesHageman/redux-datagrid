# reduxDatagrid()

The Higher-Order Component that wraps your datagrid components.

```js
import { reduxDatagrid } from 'redux-datagrid';

const MyDatagrid = ({ ... }) => <div>...</div>;

export default reduxDatagrid({
  name: 'my-grid',
  columns: ['name', 'email']
})(MyDatagrid);
```

### `reduxDatagrid(options) => (Component) => ConnectedComponent`

## Options

### `name : string (Required)`

The unique identifier of the grid component used in the reducer.

### `columns : Array<string | ColumnDef>`

The columns of the data, otherwise thought of as the keys in the data that can be searched and sorted by. `ColumnDef` has the following type signature:

```js
type ColumnDef = {
  dataKey: string,
  cellDataGetter: (dataKey: string, row: any) => string
}
```

```js
// the following are equivalent:

reduxDatagrid({
  columns: [ 'name' ]
})(MyDatagrid);

reduxDatagrid({
  columns: [
    {
      dataKey: 'name',
      cellDataGetter: (_, row) => row.name
    }
  ]
})(MyDatagrid);
```

### Using Immutable.js

When using Immutable.js objects you'll have to specify a proper `cellDataGetter` function. Here's an example:

```js
function immutableCellDataGetter(dataKey, row) {
  return row.get(dataKey, ''); // default to '' if dataKey not found
}

// ...

reduxDatagrid({
  columns: [
    dataKey: name,
    cellDataGetter: immutableCellDataGetter
  ]
})(MyDatagrid);
```
