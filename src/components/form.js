import React from 'react';

const Form = ({ children, handleSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      document.activeElement.blur();
      handleSubmit();
    }}>
    { children }
  </form>
);

Form.propTypes = {
  children: React.PropTypes.node,
  handleSubmit: React.PropTypes.func,
};

export default Form;
