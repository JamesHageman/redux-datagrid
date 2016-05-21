import React from 'react';
import BasicList from './list';
import people from '../../mock/people';
import CodeTabs from '../util/code-tabs';
import code from '!!raw!./list.js';

const BasicListExample = () => <div>
  <h2>Basic List</h2>
  <p>
    This example puts the data in a good ol' unordered list with some nice
    styles. It demonstrates how to use
    the <code>search</code> and <code>sortBy</code> controls.
  </p>
  <CodeTabs code={code}>
    <BasicList data={people}/>
  </CodeTabs>
</div>;

export default BasicListExample;
