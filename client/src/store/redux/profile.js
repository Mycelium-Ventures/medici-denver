import { fmWeb3 } from '../index'


/**
 * Redux - Profile
 */
export const ProfileActionTypes = {
  SET_ETH_ADDRESS: 'SET_ETH_ADDRESS',
  SET_DID: 'SET_DID',
  SET_INFO: 'SET_INFO',
  LOGGING_IN: 'LOGGING_IN',
  READY: 'READY',
  LOGOUT: 'LOGOUT',
  CHECK_CONNECTED_ACCTS: 'CHECK_CONNECTED_ACCTS',
  WELCOME_SHOWN: "WELCOME_SHOWN"
};

/*
*************************************************************************************
* Store Schema
*************************************************************************************
 */
const initialState = {
  ready: false,
  loading: true,
  ethAddress: null,
  twitchId: null,
  twitchLinked: false,
  ytLinked: false,
  did: null,
  name: '',
  welcomeShown: false
}

// this only runs once on startup
export const ActionCheckAccts = () => {
  return async function(dispatch, getState, {fmWeb3}){

    const state = getState()

    /*
    // check if there is an account, just once
    if (state.drizzleStatus.initialized && !state.accounts[0]){
      const ethAddress = await web3.currentProvider.enable()

      dispatch({
        type: ProfileActionTypes.SET_ETH_ADDRESS,
        ethAddress: ethAddress
      })
    }
    */

    // we are always calling Fortmatic now
    if (state.reducers.profile.ethAddress === null){
      const ethAddress = await fmWeb3.currentProvider.enable()

      dispatch({
        type: ProfileActionTypes.SET_ETH_ADDRESS,
        ethAddress: ethAddress[0]
      })
    }

    // TODO: check redux for connected Twitch
    /*
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
    */

    dispatch({
      type: ProfileActionTypes.READY
    })

    return Promise.resolve()
  }
}

//Simple function to set welcome shown to true
export const welcomeShown = () => {
  return async function(dispatch, getState, {fmWeb3}){
    const state = getState()
    dispatch({
      type: ProfileActionTypes.WELCOME_SHOWN
    })
    return Promise.resolve()
  }
}

/*
*************************************************************************************
* Reducer
*************************************************************************************
 */
export default {

  profile: (state = initialState, action) => {

    switch (action.type) {
      case ProfileActionTypes.READY:
        return {
          ...state,
          ready: true
        }
      case ProfileActionTypes.WELCOME_SHOWN:
        return {
          ...state,
          welcomeShown: true
        }

      case ProfileActionTypes.LOGOUT:
        return {
          ...state,
          did: null,
          loading: true
        }

      // we set this first so we show the loading screen
      case ProfileActionTypes.LOGGING_IN:
        return {
          ...state,
          loading: true
        }

      case ProfileActionTypes.SET_ETH_ADDRESS:
        return {
          ...state,
          ethAddress: action.ethAddress
        }

      case ProfileActionTypes.SET_DID:
        return {
          ...state,
          did: action.did,
          loading: false
        }

      case ProfileActionTypes.SET_INFO:
        return {
          ...state,
          name: action.name,
          country: action.country
        }
    }

    return state
  }
}
