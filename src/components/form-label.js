import React from 'react';

const FormLabel = ({ children, style = {} }) => (
  <label style={{ ...styles.base, ...style }}>
    { children }
  </label>
);

FormLabel.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

const styles = {
  base: {},
};

export default FormLabel;
