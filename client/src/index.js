import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import drizzle, { store, history, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css';
import App from './App';
import Loading from './pages/Loading'

// import Loading from './pages/Loading'

import * as serviceWorker from './serviceWorker';
import { DrizzleContext } from '@drizzle/react-plugin'


ReactDOM.render(
  <PersistGate loading={Loading} persistor={persistor}>
    <Provider store={store}>
      <DrizzleContext.Provider store={store} drizzle={drizzle}>
        <React.Suspense fallback={Loading}>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </React.Suspense>
      </DrizzleContext.Provider>
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
