import React from 'react';
import classNames from 'classnames';

const FormError = ({ children, isVisible }) => {
  const formErrorClasses = classNames('bold', 'black', { 'hide': !isVisible });

  return (
    <div className={ formErrorClasses }>
      { children }
    </div>
  );
};

FormError.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
};

export default FormError;
