import { applyMiddleware } from 'redux'
import { Drizzle, generateStore } from "@drizzle/store"
import DrizzleOptions from "./drizzleOptions"
import thunk from 'redux-thunk'
import { connectRouter } from 'connected-react-router'
import { loadLocalStorage, saveLocalStorage } from "./localstorage"
import { contractEventNotifier, contractAddNotifier } from "../middleware"
import { createBrowserHistory } from 'history'

import Fortmatic from 'fortmatic'
import Web3 from "web3"

import reducers from './reducers'
// import contractMetadataReducer from "./reducers/contractMetadataReducer"


export const fm = new Fortmatic('pk_test_4FCC9EB428DA91E3', 'ropsten')
export const fmWeb3 = new Web3(fm.getProvider())

const drizzleOptions = DrizzleOptions()

console.log(drizzleOptions)

// Load saved Web3 contracts
const persistedState = loadLocalStorage("state")
const persistedContracts = loadLocalStorage("contracts")
if (persistedContracts) {
  drizzleOptions.contracts = persistedContracts.contracts
}
console.log(drizzleOptions.contracts)

export const history = createBrowserHistory()

const appReducers = {
  reducers,

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
const drizzle = new Drizzle(drizzleOptions, store)

export default drizzle
