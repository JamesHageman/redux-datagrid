import React from 'react';
import ReactDOM from 'react-dom';
import routes from './store/routes';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from './store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore({}, routes);

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
