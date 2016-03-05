import React from 'react';

const NavigatorItem = ({ children, isVisible = true, className = '' }) => {
  const visibleClass = isVisible ? 'block' : 'hide';

  return (
    <div
      className={ `${ visibleClass } ${ className }` }
      style={ styles.base }>
      { children }
    </div>
  );
};

NavigatorItem.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
  className: React.PropTypes.string,
};

const styles = {
  base: {},
};

export default NavigatorItem;
