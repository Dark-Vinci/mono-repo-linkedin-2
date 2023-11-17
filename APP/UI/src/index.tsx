import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import { Provider } from 'react-redux';

import './styles/index.css';
import { dummyReducer } from './app-store';
import { App, reportWebVitals } from './startup';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  dum: dummyReducer,
  // other are found here
});

const store = createStore(reducers, applyMiddleware(composeEnhancer));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
