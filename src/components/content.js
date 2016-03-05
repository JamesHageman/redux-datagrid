import React from 'react';

const Content = ({ children, style = {}, isVisible }) => (
  <div
    className={ 'mt3 p1' }
    style={{ ...styles.base, style }}>
    { isVisible ? children : null }
  </div>
);

Content.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  isVisible: React.PropTypes.bool,
};

const styles = {
  base: {},
};

export default Content;
