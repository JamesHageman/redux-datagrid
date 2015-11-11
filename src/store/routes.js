import React from 'react';
import { Router, Route } from 'react-router';
import CounterPage from '../containers/CounterPage';
import LoginPage from '../containers/LoginPage';

export default (
  <Router>
    <Route path="/" component={ CounterPage } />
    <Route path="/login" component={ LoginPage }/>
  </Router>
);
