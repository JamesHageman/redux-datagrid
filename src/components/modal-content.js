import React from 'react';

const ModalContent = ({ children, style = {}, className = '' }) => {
  return (
    <div
      className={ `${ className } p1 z4 bg-white` }
      style={{ ...styles.base, ...style }}>
      { children }
    </div>
  );
};

ModalContent.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
};

const styles = {
  base: {
    width: '25%',
    margin: '4rem auto',
  },
};

export default ModalContent;
