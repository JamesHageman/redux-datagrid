import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from './components/root';
import GettingStarted from './components/getting-started';
import NotFound from './components/not-found';
import BasicListExample from './components/basic-list';
import BasicTableExample from './components/basic-table';
import GroupingTableExample from './components/grouping';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={GettingStarted}/>
    <Route path="/examples/basic-list" component={BasicListExample}/>
    <Route path="/examples/basic-table" component={BasicTableExample}/>
    <Route path="/examples/grouping" component={GroupingTableExample}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
