import React from 'react';

function ModalContent({ children, close }) {
  return (
    <div className="p2 z2 bg-white modal relative">
      <button className="btn absolute top-0 right-0 m1"
        onClick={ close }>
        ✖︎
      </button>
      { children }
    </div>
  );
}

ModalContent.propTypes = {
  children: React.PropTypes.node,
  close: React.PropTypes.func,
};

export default ModalContent;
