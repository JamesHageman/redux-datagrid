import React from 'react';
import CodeTabs from '../util/code-tabs';
import BasicTable from './table';
import code from '!!raw!./table';
import people from '../../mock/people';


const BasicTableExample = () => <div>
  <h2>Basic List</h2>
  <CodeTabs code={code}>
    <BasicTable data={people}/>
  </CodeTabs>
</div>;

export default BasicTableExample;
