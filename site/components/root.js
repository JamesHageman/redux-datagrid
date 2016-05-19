import React from 'react';
import { Link } from 'react-router';

const Root = ({ children }) => <div className="bg-white">
  <header className="p1 bg-darken-1">
    <div>
      <h1 className="inline mr1">Redux Datagrid</h1>
      <lead>The easiest way to sort, filter and group your data</lead>
    </div>
    <nav className="clearfix">
      <a className="col-right"
        href="https://github.com/JamesHageman/redux-datagrid">Github</a>
    </nav>
  </header>
  <main className="flex">
    <nav className="bg-darken-2 p1" style={{minWidth: 140}}>
      <Link to="/">Getting Started</Link>
      <h3>Examples</h3>
      <ul className="list-reset">
        <li><Link to="/examples/basic-list">Basic List</Link></li>
        <li><Link to="/examples/basic-table">Basic Table</Link></li>
        <li><Link to="/examples/grouping-table">Grouping Table</Link></li>
        <li><Link to="/examples/infinite-list">Infinite list</Link></li>
      </ul>
    </nav>
    <section className="flex-auto p1">
      { children }
    </section>
  </main>
  <footer className="py2 px1 bg-darken-1 clearfix">
    <div className="center">
      Written by <a href="https://github.com/JamesHageman">James Hageman</a>
    </div>
  </footer>
</div>;

export default Root;
