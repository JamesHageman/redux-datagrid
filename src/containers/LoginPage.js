import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { loginUser } from '../actions/user';
import Radium from 'radium';
import axios from 'axios';
import { Map } from 'immutable';

@Radium
@connect(mapState, { loginUser, pushState })
class LoginPage extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Map),
  };

  _login = () => {
    const { props, state, refs } = this;
    const username = refs.username.value;
    const password = refs.password.value;

    // check the username and password to see if they're correct
    const foundUsers = state.users.filter((user) => user.Username === username);
    const isValid = (
      foundUsers.length === 1 &&
      foundUsers[0].Password === password
    );

    // if correct, fire the action to login the user
    if (isValid) {
      props.loginUser(username);
      props.pushState(null, '/');
    } else {
      // set the state as invalid so an error message will appear
      this.setState({
        numAttempts: state.numAttempts + 1,
        loginError: true,
      });
    }
  };

  state = {
    users: [],
    numAttempts: 0,
    loginError: false,
  };

  componentDidMount() {
    // Fetch the users list via XHR
    const userDataPath = './src/users.json';
    axios
      .get(userDataPath)
      .then((response) => {
        // successful response will set the state with the user data
        this.setState({ users: response.data });
      });
  }

  render() {
    const { _login, state } = this;
    const errorStyles = Object.assign({},
      styles.errorMsg,
      (state.loginError ? {} : styles.hide),
    );

    return (
      <div style={ styles.container }>
        <h1>Login</h1>
        <div style={ errorStyles }>
          Invalid Username or Password
        </div>
        <div>
          <label htmlFor="txtUsername">Username:</label>
          <input type="text" id="txtUsername" ref="username" />
        </div>
        <div>
          <label htmlFor="txtPassword">Password:</label>
          <input type="password" id="txtPassword" ref="password" />
        </div>
        <div>
          <button onClick={ _login }>Login</button>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user,
    router: state.router,
  };
}

const styles = {
  container: {
    padding: '20px',
    font: '14px Arial',
  },
  errorMsg: {
    fontWeight: 'bold',
    color: 'red',
  },
  hide: {
    display: 'none',
  },
};

// Map the loginUser action to the props for LoginPage
export default LoginPage;
