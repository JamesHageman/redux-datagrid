import React from 'react';
import CodeTabs from '../util/code-tabs';
import BasicTable from './table';
import code from '!!raw!./table';
import people from '../../mock/people';


const BasicTableExample = () => <div>
  <h2>Basic Table</h2>
  <p>
    This example renders the data in a <code>react-virtualized</code> <code>FlexTable</code> component.
    It shows how to adapt <code>redux-datagrid</code>'s column objects to make columns
    in other api's.
  </p>
  <CodeTabs code={code}>
    <BasicTable data={people}/>
  </CodeTabs>
</div>;

export default BasicTableExample;
