import React from 'react';
import BasicList from './list';
import people from '../../mock/people';

const BasicListExample = () => <div>
  <h2>Basic List</h2>
  <BasicList data={people}/>
</div>;

export default BasicListExample;
