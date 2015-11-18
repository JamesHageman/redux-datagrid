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
      styles.visible :
      styles.hidden;

    const loadingStyles = user.get('isLoading') === true ?
      styles.visible :
      styles.hidden;

    const submitForm = (e) => {
      e.preventDefault();
      attemptLogin(this.refs.username.value, this.refs.password.value);
    };

    return (
      <div className="m2 border sm-col-12" style={ styles.base }>
        <form onSubmit={ submitForm }>

          <div className="p1 border-bottom">
            <h1>Login</h1>
          </div>

          <div style={ errorStyles } className="bg-red white p1 bold">
            Invalid Username or Password
          </div>

          <div style={ loadingStyles } className="bg-navy silver p1 bold">
            Loading...
          </div>

          <div className="mt1 mr1 ml1 mb2">
            <label htmlFor="txtUsername">Username:</label>
            <input
              className="block col-12 mb1 field"
              type="text"
              id="txtUsername"
              ref="username" />
          </div>

          <div className="mt1 mr1 ml1 mb2">
            <label htmlFor="txtPassword">Password:</label>
            <input
              className="block col-12 mb1 field"
              type="password"
              id="txtPassword"
              ref="password" />
          </div>

          <div className="mt1 mr1 ml1 mb2">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={ submitForm }>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const styles = {
  base: {
    width: 350,
  },
  visible: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
};

export default LoginPage;
