import createHistory from "history/createBrowserHistory";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router";
import {
  ConnectedRouter,
  push,
  routerMiddleware,
  routerReducer
} from "react-router-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import App from "../modules/App";

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const _WINDOW: any = window;
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  _WINDOW.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? _WINDOW.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false
      })
    : compose;

const reducers = {};
const history = createHistory();
// const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];
const enhancers = [applyMiddleware(...middlewares)];
const store: any = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(...enhancers)
);
// Extensions
store.runSaga = sagaMiddleware.run;
store.injectedReducers = {}; // Reducer registry
store.injectedSagas = {}; // Saga registry

const mountNode = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  mountNode
);
