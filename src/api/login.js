import usersMock from '../utils/mock/users.json';

export function login(username, password) {
  return new Promise((resolve, reject) => {
    const foundUsers = usersMock.filter((user) => user.Username === username);

    const isValid = (
      foundUsers.length === 1 &&
      foundUsers[0].Password === password
    );

    if (isValid) {
      setTimeout(() => resolve(username, password), 750);
    } else {
      setTimeout(() => reject(username, password), 750);
    }
  });
}
