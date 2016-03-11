import React from 'react';

const Content = ({ children, isVisible }) => (
  <main>
    { isVisible ? children : null }
  </main>
);

Content.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
};

export default Content;
