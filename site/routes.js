import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from './components/root';
import GettingStarted from './components/getting-started';
import NotFound from './components/not-found';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={GettingStarted}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
