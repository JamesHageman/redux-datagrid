import React from 'react';

function Modal({ isVisible, children }) {
  const styles = {
    visibility: isVisible ? 'visible' : 'hidden',
    opacity: isVisible ? 1 : 0,
  };

  return (
    <div style={ styles }
      className="fixed top-0 bottom-0 left-0 right-0 z1 bg-darken-3">
      { children }
    </div>
  );
}

Modal.propTypes = {
  isVisible: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Modal;
