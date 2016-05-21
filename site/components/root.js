import React from 'react';
import { Link } from 'react-router';
import { version } from '!!json!../../package.json';

const Root = ({ children }) => <div className="bg-white">
  <header className="p1 bg-darken-1">
    <div>
      <h1 className="inline mr1">Redux Datagrid</h1>
      <lead>The easiest way to sort, filter and group your data</lead>
    </div>
    <nav className="clearfix">
      <div className="col-right">
        {`v${version} | `}
        <a href="https://github.com/JamesHageman/redux-datagrid">Github</a>
      </div>
    </nav>
  </header>
  <main className="flex">
    <nav className="bg-darken-2 p1" style={{minWidth: 140}}>
      <Link to="/">Getting Started</Link>
      <h3>Examples</h3>
      <ul className="list-reset">
        <li><Link to="/examples/basic-list">Basic List</Link></li>
        <li><Link to="/examples/basic-table">Basic Table</Link></li>
        <li>Grouping Table</li>
        <li>Immutable Example</li>
      </ul>
      <h3>API</h3>
      <ul className="list-reset">
        <li>reduxDatagrid()</li>
        <li>Component Props</li>
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
