import React from 'react';

const Counter = ({ counter, increment, decrement }) => {
  return (
    <div>
      <button onClick={ increment }>Increment</button>
      { ` ${ counter } ` }
      <button onClick={ decrement }>Decrement</button>
    </div>
  );
};

export default Counter;
