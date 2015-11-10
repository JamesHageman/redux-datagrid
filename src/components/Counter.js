import React, { Component, PropTypes } from 'react';

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  render() {
    const { counter, increment, decrement } = this.props;
    return (
      <div>
        <button onClick={ increment }>Increment</button>
        { ' ' + counter + ' ' }
        <button onClick={ decrement }>Decrement</button>
      </div>
    );
  }
}

export default Counter;
