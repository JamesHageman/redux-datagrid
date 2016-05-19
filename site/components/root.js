import React from 'react';
import { Link } from 'react-router';

const Root = ({ children }) => <div className="bg-white">
  <header className="p1 bg-darken-1">
    <h1>Redux Datagrid</h1>
    <lead>The easiest way to sort, filter and group your data</lead>
  </header>
  <main className="flex">
    <nav className="fixed-width-1 bg-darken-2 p1">
      <Link to="/">Getting Started</Link>
      <h3>Examples</h3>
      <ul className="list-reset">
        <li><Link to="/examples/basic">Basic List</Link></li>
        <li><Link to="/examples/basic">Basic Table</Link></li>
        <li><Link to="/examples/basic">Grouping Table</Link></li>
        <li><Link to="/examples/basic">Infinite list</Link></li>
      </ul>
    </nav>
    <section className="flex-auto p1">
      { children }
    </section>
  </main>
  <footer className="p1 bg-darken-1">
    <p>Written by <a href="https://github.com/JamesHageman">James Hageman</a></p>
  </footer>
</div>;

export default Root;
