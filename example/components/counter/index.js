import React from 'react';
import Button from '../button';

function Counter({ counter, increment, decrement }) {
  return (
    <div className="flex">
      <Button data-ref="decrementButton" className="bg-black col-2"
        onClick={ decrement }>
        -
      </Button>

      <div data-ref="result" className="flex-auto center h1">
        { counter }
      </div>

      <Button data-ref="incrementButton" className="col-2"
        onClick={ increment }>
        +
      </Button>
    </div>
  );
}

Counter.propTypes = {
  counter: React.PropTypes.number,
  increment: React.PropTypes.func,
  decrement: React.PropTypes.func,
};

export default Counter;
