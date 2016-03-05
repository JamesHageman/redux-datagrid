import React from 'react';

const FormGroup = ({ children, style = {}, className = '' }) => (
  <div className={ `p2 ${ className }` } style={{ ...styles.base, ...style }}>
    { children }
  </div>
);

FormGroup.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
};

const styles = {
  base: {},
};

export default FormGroup;
