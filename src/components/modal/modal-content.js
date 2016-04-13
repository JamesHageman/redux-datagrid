import React from 'react';

function ModalContent({ children }) {
  return (
    <div className="p2 z2 bg-white modal relative">
      { children }
    </div>
  );
}

ModalContent.propTypes = {
  children: React.PropTypes.node,
};

export default ModalContent;
