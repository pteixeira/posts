import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import routes from './routes';
import rootReducer from './rootReducer';

import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';
import setAuthorizationToken from './utils/setAuthorizationToken';

/**
  (state = {}) => state
  is the same as
  function(state = {}) { return state; };
**/
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// extract this to make cleaner
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
