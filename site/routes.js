import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from './components/root';
import GettingStarted from './components/getting-started';
import NotFound from './components/not-found';
import BasicListExample from './components/basic-list';
import BasicTableExample from './components/basic-table';
import GroupingTableExample from './components/grouping';
import ImmutableTableExample from './components/immutable';

import markdownRoute from './components/util/markdown-route';

import internal from '!!raw!../docs/internal-props.md';
import external from '!!raw!../docs/external-props.md';
import hocDocs from '!!raw!../docs/redux-datagrid.md';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={GettingStarted}/>
    <Route path="/examples/basic-list" component={BasicListExample}/>
    <Route path="/examples/basic-table" component={BasicTableExample}/>
    <Route path="/examples/grouping" component={GroupingTableExample}/>
    <Route path="/examples/immutable" component={ImmutableTableExample}/>
    <Route path="/docs/internal-props" component={markdownRoute({ markdown: internal })}/>
    <Route path="/docs/external-props" component={markdownRoute({ markdown: external })}/>
    <Route path="/docs/redux-datagrid" component={markdownRoute({ markdown: hocDocs })}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
