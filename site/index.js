import './styles/index.css';
import React from 'react';
import { Router } from 'react-router';
import { render } from 'react-dom';
import { createStore } from 'redux';
import routes from './routes';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { hashHistory } from 'react-router';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
