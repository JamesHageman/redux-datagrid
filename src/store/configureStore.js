import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';

import history from './history';
import routes from './routes';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';
import logger from './logger';
import rootReducer from '../reducers';

function configureStore(initialState) {
  const store = compose(
    applyMiddleware(
      promiseMiddleware,
      thunk,
      logger,
    ),
    reduxReactRouter({
      routes,
      history,
    }),
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
