import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/user';
import Radium from 'radium';

function mapStateToProps(state) {
  return {
    user: state.user,
    router: state.router,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: (username, password) => dispatch(loginUser(username, password)),
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class LoginPage extends Component {
  static propTypes = {
    attemptLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const {
      user,
      attemptLogin,
    } = this.props;

    const errorStyles = user.get('hasError') === true ?
      styles.errorMsg :
      styles.hide;

    const submitForm = (e) => {
      e.preventDefault();
      attemptLogin(this.refs.username.value, this.refs.password.value);
    };

    return (
      <div style={ styles.container }>
        <form onSubmit={ submitForm }>
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
            <button type="submit"onClick={ submitForm }>Login</button>
          </div>
        </form>
      </div>
    );
  }
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

export default LoginPage;
