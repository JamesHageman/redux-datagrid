import React from 'react';
import BasicList from './list';
import people from '../../mock/people';
import CodeTabs from '../util/code-tabs';
import code from 'raw!./list.js';

const BasicListExample = () => <div>
  <h2>Basic List</h2>
  <CodeTabs code={code}>
    <BasicList data={people} defaultSortBy="email"/>
  </CodeTabs>
</div>;

export default BasicListExample;
