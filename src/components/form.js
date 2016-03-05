import React from 'react';

const Form = ({ children, style = {}, handleSubmit }) => (
  <form
    style={{ ...styles.base, ...style }}
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
  style: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
};

const styles = {
  base: {},
};

export default Form;
