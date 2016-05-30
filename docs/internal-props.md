# Internal Props

These props are passed to your connected datagrid to use inside its `render()` function. They are all passed under the `datagrid` namespace, so it's helpful if you desctructuring like so:

```js

const MyDatagrid = ({ datagrid: { data, filtered }}) => <div>
  // ...
</div>;
```
### `datagrid.data : Array<any> | Immutable.List<any>`

The raw data passed from the parent.

```js
const myData = [ ... ];

const MyDatagrid = ({ datagrid: { data }}) => {
  // data === myData;
};

// later on
<MyDatagrid data={ myData } />;
```

### `datagrid.filtered : Array<any> | Immutable.List<any>`
 
The sorted data filtered by your searchText.

```js
const MyDatagrid = ({ datagrid: { data, filtered }}) {
  return <div>
    Showing { filtered.length } / { data.length }
    <ul> ... </ul>
  </div>;
}
```

### `datagrid.grouped : { [key : string]: Array<any> } | null`

An object with data grouped by the current `groupBy` in redux. Will be `null` if `groupBy` is unspecified.

### `datagrid.controls.search : { value: string, onChange: (e: ChangeEvent) => void }`

A utility object for the search text. Can be spread onto `<input>` components to easily connect them to redux.

```js
const MyDatagrid = ({ datagrid: { controls: { search }}}) => <div>
  <input placeholder="Search" {...search} />
  // same as
  <input placeholder="Search" value={search.value} onChange={search.onChange} />

  <ul> ... </ul>
</div>
```

### `datagrid.controls.sortBy : { value: string, onChange: (e: ChangeEvent) => void }`

### `datagrid.controls.groupBy : { value: string, onChange: (e: ChangeEvent) => void }`

### `datagrid.controls.sortDirection : { value: string, onChange: (e: ChangeEvent) => void }`
