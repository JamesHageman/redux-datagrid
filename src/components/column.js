import React from 'react';

const Column = ({ children, className = '', style = {} }) => (
  <div className={ `col ${ className }` } style={{ ...styles.base, ...style }}>
    { children }
  </div>
);

const styles = {
  base: {},
};

export default Column;
