import React from 'react';

const Column = ({ children, className = '', style = {} }) => (
  <div className={ `col ${ className }` } style={{ ...styles.base, ...style }}>
    { children }
  </div>
);

Column.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

const styles = {
  base: {},
};

export default Column;
