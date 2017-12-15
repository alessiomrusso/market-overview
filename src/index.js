import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";

import reducers from "./reducers";
import Dashboard from "./components/dashboard";

// Styles
import '../static/styles/style.scss';
import '../static/styles/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
     <Dashboard />
  </Provider>,
  document.querySelector('#app')
);