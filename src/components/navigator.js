import React from 'react';

const Navigator = ({ children }) => (
  <nav className="flex items-center p1 bg-white border-bottom">
    { children }
  </nav>
);

Navigator.propTypes = {
  children: React.PropTypes.node,
};

export default Navigator;
