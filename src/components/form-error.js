import React from 'react';

const FormError = ({ children, isVisible, style = {}, className = ''}) => {
  const visibleClass = isVisible ? 'block' : 'hide';

  return (
    <div
      className={ `${ className } bold ${ visibleClass } black` }
      style={{ ...styles.base, ...style }}>
      { children }
    </div>
  );
};

FormError.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
};

const styles = {
  base: {},
};

export default FormError;
