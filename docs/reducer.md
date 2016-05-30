# Reducer

`redux-datagrid` provides a reducer that must be mounted at the top-level key `datagrid`. 

```js
// in reducers.js or something similar
import { combineReducers } from 'redux';
import * as otherReducers from './other-reducers.js';
import { reducer as datagridReducer } from 'redux-datagrid';

export default combineReducers({
  ...otherReducers,
  datagrid: datagridReducer
});
```
