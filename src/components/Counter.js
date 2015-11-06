import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
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
        <h1 style={ styles.base }>Counter</h1>
        <hr />
        <button onClick={ increment }>Increment</button>
        { ' ' + counter + ' ' }
        <button onClick={ decrement }>Decrement</button>
      </div>
    );
  }
}

const styles = {
  base: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default Counter;
