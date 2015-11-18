import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import Radium from 'radium';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    counter: state.counter.get('count'),
    user: state.user.get('username'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch(CounterActions.increment()),
    decrement: () => dispatch(CounterActions.decrement()),
    logout: () => dispatch(logoutUser()),
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class CounterApp extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const {
      counter,
      increment,
      decrement,
      logout,
    } = this.props;

    return (
      <div className="m2 border sm-col-12" style={ styles.base }>
        <div className="p1 border-bottom">
          <h1>Counter</h1>
        </div>

        <div className="p1 border-bottom">
          <Counter
            counter={ counter }
            increment={ increment }
            decrement={ decrement } />
        </div>

        <div className="p1">
          <button
            className="btn btn-primary bg-red"
            type="button"
            onClick={ logout }>
            Logout
          </button>
        </div>
      </div>
    );
  }
}


const styles = {
  base: {
    width: 350,
  },
};

export default CounterApp;
