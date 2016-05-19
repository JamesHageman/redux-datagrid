import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from './components/root';
import GettingStarted from './components/getting-started';
import NotFound from './components/not-found';
import BasicList from './components/basic-list';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={GettingStarted}/>
    <Route path="/examples/basic-list" component={BasicList}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
