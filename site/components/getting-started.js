import React from 'react';
import Highlight from 'react-highlight';

const GettingStarted = () => <div>
  <h2>Getting Started</h2>
  <p>
    To begin, install redux-datagrid with npm. First you'll need to
    install <code>react-redux</code> and <code>reselect</code> if you don't have them
    already.
    <pre>
      npm install --save react-redux reselect
    </pre>
    Then install the library.
    <pre>
      npm install --save redux-datagrid
    </pre>
    Once install finishes, you'll need to hook up the reducer:
    <Highlight className="javascript">
{`// reducers.js
import { reducer as datagridReducer } from 'react-datagrid';

export default combineReducers({
  ... otherReducers,
  datagrid: datagridReducer // datagrid must be mounted at the top level reducer
});`}
    </Highlight>

    Now you're ready to create a connected datagrid! Here's an example of a
    simple list:

    <Highlight className="javascript">
{`// example-list.js
import { reduxDatagrid } from 'redux-datagrid';

// create simple list component
const ExampleList = ({ datagrid: { data, filtered, { controls: { search }}}}) => (
  <div>
    <input placeholder="Search" {...search}/>
    Showing { filtered.length } / { data.length }
    <ul>
      { filtered.map(row => <li key={row.id}>{row.name}</li>) }
    </ul>
  </div>
);

// connect ExampleList to redux
export default reduxDatagrid({
  name: 'example-list',
  columns: [ 'name' ]
})(ExampleList);
`}
    </Highlight>

    And later on you can use this component like this:
    <Highlight className="javascript">
{`// other-component.js
import ExampleList from './path/to/example-list.js';

const data = [
  { id: 1, name: 'Javascript' },
  { id: 2, name: 'Ruby'},
  { id: 3, name: 'Python'},
  // ...
];

const OtherComponent = () => (
  <div>
    <p>Some other stuff...</p>
    <ExampleList data={data}/>
  </div>
);
`}
    </Highlight>

    Here's an explanation of what's going on here:
    <ol>
      <li>
        <code>ExampleList</code> is just a stateless component that is passed a
        prop called <code>datagrid</code>
      </li>
      <li>
        <code>datagrid</code> has a couple of fields: <code>data</code> is the
        full list passed to the component, <code>filtered</code> is the sorted
        data that passes the search criteria, and <code>controls</code> provides
        utilities for connecting inputs like search or sort-by.
      </li>
      <li>
        <code>{'{...search}'}</code> just provides the input with
        the right <code>value</code> and <code>onChange</code> props.
      </li>
      <li>
        <code>ExampleList</code> is connected to redux with
        the <code>reduxDatagrid</code> function. It is given a unique name and a
        list of columns that can be searched (in this case, you can only
        search for "name").
      </li>
      <li>
        When <code>ExampleList</code> is rendered, it is passed
        a prop <code>data</code> that provides it with the full list of
        programming languages.
      </li>
      <li>
        <code>redux-datagrid</code> keeps track of things like search text,
        sort-by, and group-by, and automatically processes the data for you.
      </li>
    </ol>

    <p>Want to know more? Check out some examples or read the API documentation.</p>
    <p>
      If you find any bugs, you can create an issue
      on <a href="https://github.com/JamesHageman/redux-datagrid">github</a> or
      contact me directly
      on <a href="https://twitter.com/jamesyhageman">twitter</a>.
    </p>
  </p>
</div>;

export default GettingStarted;
