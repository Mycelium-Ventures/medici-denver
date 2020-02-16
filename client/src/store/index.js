import { Drizzle, generateStore } from "@drizzle/store"
import DrizzleOptions from "./drizzleOptions"
import thunk from 'redux-thunk'
import { connectRouter } from 'connected-react-router'
import { contractEventNotifier, contractAddNotifier } from "../middleware"
import { createBrowserHistory } from 'history'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import Fortmatic from 'fortmatic'
import Web3 from "web3"

import reducers from './reducers'

export const fm = new Fortmatic('pk_test_4FCC9EB428DA91E3', 'ropsten')
export const fmWeb3 = new Web3(fm.getProvider())

const drizzleOptions = DrizzleOptions()

export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
}

const appReducers = {
  // todo rename this to root
  reducers: persistReducer(persistConfig, reducers),

  // this must be on the root level
  router: connectRouter(history)
}

const appMiddlewares = [thunk.withExtraArgument({fmWeb3, fm}), contractEventNotifier, contractAddNotifier]

const config = {
  drizzleOptions,
  appReducers,
  appMiddlewares,
  disableReduxDevTools: false // enable ReduxDevTools!
}
export const store = generateStore(config)

export const persistor = persistStore(store)

const drizzle = new Drizzle(drizzleOptions, store)

export default drizzle
