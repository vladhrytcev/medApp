import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './redux/store/index';



const initialState = {};
export const history = createBrowserHistory();

export const store = configureStore(initialState, history);


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root'));
