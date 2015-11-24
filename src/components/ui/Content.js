import React from 'react';

const Content = ({ children, isVisible }) => {
  const visibleClass = isVisible ? 'block' : 'hide';

  return (
    <div
      className={ `mt3 p1 ${ visibleClass }` }
      style={{ ...styles.base, styles }}>
      { children }
    </div>
  );
};

const styles = {
  base: {},
};

export default Content;
