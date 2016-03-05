import React from 'react';

const Container = ({ children, style = {}, className = '' }) => (
  <div className={ `container ${ className }` } style={{ ...styles.base, ...style }}>
    <div className="clearfix">
      { children }
    </div>
  </div>
);

Container.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

const styles = {
  base: {},
};

export default Container;
