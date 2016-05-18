import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/container';
import Datagrid from '../components/datagrid';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

let i = 0;
function genItem(props) {
  i++;
  return { id: i, name: `Item ${i}`, ...props };
}

const data = [genItem({ type: 'foo'}), genItem({ type: 'bar'}), genItem({ type: 'foo'})];

function AboutPage() {
  return (
    <Container size={4} center>
      <h2 className="caps">About Us</h2>
      <p>
        Rangle.io is a next-generation HTML5 design and development firm
        dedicated to modern, responsive web and mobile applications.
      </p>
      <div>
        <Datagrid
          data={data}
          defaultGroupBy="type"
          defaultSortBy="type"/>
      </div>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutPage);
