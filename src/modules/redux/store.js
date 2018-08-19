import { createStore, combineReducers, applyMiddleware } from 'redux';

import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import { history } from '$components/Router';

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

export default createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware),
);
