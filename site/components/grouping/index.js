import React from 'react';
import CodeTabs from '../util/code-tabs';
import GroupingTable from './table';
import code from '!!raw!./table';
import people from '../../mock/people';


const BasicTableExample = () => <div>
  <h2>Grouping Table (WIP)</h2>
  <p>
    This example uses the <code>grouping</code> object to seperate the data into
    different groups. The API for this is still a bit clunky and I'll be working
    to get it cleaned up.
  </p>
  <p>
    The connected component is called with a default group by like so: <pre>{'<GroupingTable data={data} defaultGroupBy="favoriteFruit">'}</pre>
  </p>
  <CodeTabs code={code}>
    <GroupingTable data={people} defaultGroupBy="favoriteFruit"/>
  </CodeTabs>
</div>;

export default BasicTableExample;
