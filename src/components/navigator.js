import React from 'react';

const Navigator = ({ children }) => (
  <div
    className="flex flex-stretch flex-center p1 bg-white black border-bottom fixed top-0 left-0 right-0 z3"
    styles={ styles.base }>
    { children }
  </div>
);

Navigator.propTypes = {
  children: React.PropTypes.node,
};

const styles = {
  base: {
    height: '10rem',
  },
};

export default Navigator;
