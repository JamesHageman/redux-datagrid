import React from 'react';

const FormLabel = ({ children }) => (
  <label>
    { children }
  </label>
);

FormLabel.propTypes = {
  children: React.PropTypes.node,
};

export default FormLabel;
