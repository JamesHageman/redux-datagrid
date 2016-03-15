import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  className,
  ...props,
  type = 'button',
  onClick,
}) => {
  const buttonClasses = classNames('btn', 'btn-primary', className);

  return (
    <button
      type={ type }
      className={ buttonClasses }
      {...props}
      onClick={ onClick }>
      { children }
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  className: '',
  type: 'button',
};

export default Button;
