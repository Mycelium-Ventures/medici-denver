import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import profile from './redux/profile'


// @ts-ignore
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...profile
});

export default createRootReducer
