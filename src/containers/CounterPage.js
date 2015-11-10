import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { logoutUser } from '../actions/user';
import Radium from 'radium';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

@Radium
@connect(mapState, { ...CounterActions, pushState, logoutUser })
class CounterApp extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
  };

  _logout = () => {
    const { props } = this;
    props.logoutUser();
    props.pushState(null, '/login');
  };

  componentWillMount() {
    // check if the user is logged in, if not redirect back to the login page
    const { props } = this;
    if (props.user === null) {
      props.pushState(null, '/login');
    }
  }

  render() {
    const { _logout, props } = this;
    const { counter, increment, decrement } = props;
    return (
      <div>
        <h1 style={ styles.base }>Counter</h1>
        <hr />
        <Counter
          counter={ counter }
          increment={ increment }
          decrement={ decrement }
        />
        <button type="button" onClick={ _logout }>Logout</button>
      </div>
    );
  }
}

function mapState(state) {
  return {
    counter: state.counter.get('count'),
    user: state.user.get('username'),
  };
}

const styles = {
  base: {
    color: 'blue',
    fontFamily: 'Arial',
  },
};

export default CounterApp;
