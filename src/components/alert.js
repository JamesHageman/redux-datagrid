import React from 'react';

const componentColor = {
  info: 'bg-blue white',
  warning: 'bg-yellow black',
  success: 'bg-green black',
  error: 'bg-red white',
};

const Alert = ({ children, isVisible, status = 'info', className = '', style = {}}) => {
  const visibleClass = isVisible ? 'block' : 'hide';

  return (
    <div
      className={ `${ className } p2 bold ${ visibleClass } ${ componentColor[status] || 'info' }` }
      style={{ ...styles.base, ...style }}>
      { children }
    </div>
  );
};

Alert.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
  status: React.PropTypes.oneOf(['info', 'warning', 'success', 'error']),
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

const styles = {
  base: {},
};

export default Alert;
