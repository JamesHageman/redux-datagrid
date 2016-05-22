import React from 'react';
import CodeTabs from '../util/code-tabs';
import ImmutableTable from './table';
import code from '!!raw!./table';
import people from '../../mock/people';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

const selectPeople = () => people;
const selectImmutablePeople = createSelector(
  selectPeople,
  data => fromJS(data)
);

const ImmutableTableExample = () => <div>
  <h2>Basic Table w/ Immutable.js</h2>
  <p>
    This example renders the same thing as the Basic Table example, but the data
    is a pure <code>Immutable.List</code>. In order to make this work, you must
    attach a <code>cellDataGetter(row, dataKey)</code> function to each column.
  </p>
  <CodeTabs code={code}>
    <ImmutableTable data={selectImmutablePeople()}/>
  </CodeTabs>
</div>;

export default ImmutableTableExample;
