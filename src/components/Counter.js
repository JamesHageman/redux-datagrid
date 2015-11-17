import React from 'react';

const Counter = ({ counter, increment, decrement }) => {
  return (
    <div className="flex">
      <div className="flex-auto flex-center center">
        <button
          style={ styles.baseBtn }
          className="btn btn-primary bg-black"
          onClick={ decrement }>
          -
        </button>
      </div>

      <div className="flex-auto flex-center center h1">
        { ` ${ counter } ` }
      </div>

      <div className="flex-auto flex-center center">
        <button
          style={ styles.baseBtn }
          className="btn btn-primary"
          onClick={ increment }>
          +
        </button>
      </div>
    </div>
  );
};

const styles = {
  baseBtn: {
    width: 48,
    height: 48,
  },
};

export default Counter;
