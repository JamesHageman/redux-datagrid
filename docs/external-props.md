# External Props

When you use wrap a component with `reduxDatagrid()`, you can pass the wrapped component the following props:

## data : Array<any> | Immutable.List<any> (Required)

The raw data source for the datagrid. 

```js
const data = [ { ... }, { ... }, { ... }];

return <MyDatagrid data={ data } />;
```

`data` must be treated as an immutable - meaning that any deep changes must be reflected in the identity the array.

```js
// don't do this
data.push({ ... });

// do this instead
data = data.concat([{ ... }]);

// or use Immutable instead :)
```

## defaultSortBy : string (Optional)

The default column to sort by. `defaultSortBy` must correspond to a column defined in `reduxDatagrid({ columns: [ ... ] })`. 

```js
// my-datagrid.js
export default reduxDatagrid({
  colums: [ 'name', { dataKey: 'type' }] // string or object format
})(MyDatagrid);

// my-other-component.js
return <MyDatagrid defaultSortBy="name" data={ ... } />
// or 
return <MyDatagrid defaultSortBy="type" data={ ... } />
```

If not specified, the data will not be sorted and will be passed through in the same order it came.

## defaultGroupBy : string (Optional)

The default column to group by. Like `defaultSortBy`, if not specified, the data will not be grouped.

```js
// my-other-component.js
return <MyDatagrid defaultGroupBy="type" />
```

## defaultSortDirection : 'asc' | 'desc' (Optional)

The default sort direction. If not specified, it will be `asc`. Note that sort direction matters even if `sortBy` is null. In other words, `desc` will reverse your data even if it's not being sorted.

```js
// my-other-component.js
return <MyDatagrid defaultSortDirection="desc" />
```
