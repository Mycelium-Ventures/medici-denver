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
if (persistedState) {
  if (persistedState.contractMetadata) {
    store.dispatch({
      type: "SET_CONTRACT_METADATA",
      contractMetadata: persistedState.contractMetadata
    })
  }
}
const drizzle = new Drizzle(drizzleOptions, store)

store.subscribe(() => {
  saveLocalStorage(
    {
      todos: store.getState().todos,
      contractMetadata: store.getState().contractMetadata
    },
    "state"
  )
})

// Save Web3 contracts
const handler = {
  set(target, property, value, receiver) {
    target[property] = value
    console.log(target)
    // you have to return true to accept the changes
    const saveTarget = Object.entries(target).map(([key, value]) => {
      const { address, contractName, abi } = value
      const networks = {
        "5777": {
          events: {},
          links: {},
          address
        }
      }
      return { address, contractName, abi, networks }
    })
    saveLocalStorage(
      {
        contracts: saveTarget
      },
      "contracts"
    )

    return true
  }
}
const contractsProxy = new Proxy(drizzle.contracts, handler)
drizzle.contracts = contractsProxy

export default drizzle
