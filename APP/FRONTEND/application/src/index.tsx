import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import { App, reportWebVitals } from '@startup';

import '@startup/styles/index.css';

const reducers = combineReducers({
  auth: {} as any,
});

const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

reportWebVitals();
