import './styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './store/routes';
import history from './store/history';
import configureStore from './store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore({}, routes);

store.subscribe(() => {
  const state = store.getState();
  const currentUser = state.user.get('username');
  const currentPath = state.router.location.pathname;

  if (
    currentUser !== null &&
    currentPath === '/login'
  ) {
    history.pushState(null, '/');
  }

  if (
    currentUser === null &&
    currentPath !== '/login'
  ) {
    history.pushState(null, '/login');
  }
});

ReactDOM.render((
  <div>
    <Provider store={ store }>
      <ReduxRouter />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools
        store={ store }
        monitor={ LogMonitor }
        visibleOnLoad />
    </DebugPanel>
  </div>),
  document.getElementById('root')
);
