import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createHashHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from './logger';
import rootReducer from '../reducers';

function configureStore(initialState, routes) {
  const store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ routes, createHistory }),
    applyMiddleware(logger),
    devTools(),
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
