import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

// TODO: find out why decorators are not working
// @connect(mapState, CounterActions)
class CounterApp extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  render() {
    const { counter, increment, decrement } = this.props;
    return (
      <Counter
        counter={ counter }
        increment={ increment }
        decrement={ decrement }
      />
    );
  }
}

function mapState(state) {
  return {
    counter: state.counter.get('count'),
  };
}

export default connect(mapState, CounterActions)(CounterApp);
