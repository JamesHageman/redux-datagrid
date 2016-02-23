import React from 'react';

const Button = ({
  children,
  className = '',
  style = {},
  type = 'button',
  onClick,
}) => (
  <button
    type={ type }
    className={ `btn btn-primary  ${ className }` }
    style={{ ...styles.base, ...style }}
    onClick={ onClick }>
    { children }
  </button>
);

const styles = {
  base: {},
};

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  className: '',
  type: 'button',
  style: {},
};

export default Button;
