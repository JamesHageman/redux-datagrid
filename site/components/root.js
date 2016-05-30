import React from 'react';
import { Link } from 'react-router';
import { version } from '!!json!../../package.json';

const Root = ({ children }) => <div className="bg-white">
  <header className="p1 bg-darken-1">
    <div>
      <h1 className="inline mr1">Redux Datagrid</h1>
      <lead>A Higher-Order Component for sorting, filtering and grouping</lead>
    </div>
    <nav className="clearfix">
      <div className="col-right">
        {`v${version} | `}
        <a href="https://github.com/JamesHageman/redux-datagrid">Github</a>
      </div>
    </nav>
  </header>
  <main className="flex">
    <nav className="bg-darken-2 p1 flex-none" style={{minWidth: 140}}>
      <Link to="/">Getting Started</Link>
      <h3>Examples</h3>
      <ul className="list-reset">
        <li><Link to="/examples/basic-list">Basic List</Link></li>
        <li><Link to="/examples/basic-table">Basic Table</Link></li>
        <li><Link to="/examples/grouping">Grouping Table</Link></li>
        <li><Link to="/examples/immutable">Immutable.js Table</Link></li>
      </ul>
      <h3>API</h3>
      <ul className="list-reset">
        <li><Link to="/docs/reducer">Reducer</Link></li>
        <li><Link to="/docs/redux-datagrid">reduxDatagrid()</Link></li>
        <li><Link to="/docs/internal-props">Internal Props</Link></li>
        <li><Link to="/docs/external-props">External Props</Link></li>
      </ul>
    </nav>
    <section className="flex-auto p1">
      { children }
    </section>
  </main>
  <footer className="pt2 pb4 px1 bg-darken-1 clearfix">
    <div className="center">
      Written by <a href="https://github.com/JamesHageman">James Hageman</a>
    </div>
  </footer>
</div>;

export default Root;
