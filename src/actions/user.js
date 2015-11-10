import { LOGIN_USER, LOGOUT_USER } from '../constants';

export function loginUser(username) {
  return {
    type: LOGIN_USER,
    payload: username,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
