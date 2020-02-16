import namehash from 'eth-ens-namehash'

import drizzle from '../index'

/**
 * Redux - Profile for a Viewer
 *
 * viewer.<walletAddress>.twitchId
 * streamer.<walletAddress>.twitchId
 *
 * streamer.<walletAddress>.followers.<twitchId>
 *
 * streamer.<walletAddress>.videos.<videoId>
 *
 * video.<videoId>.viewer.<twitchId>.startTime
 * video.<videoId>.viewer.<twitchId>.endTime
 *
 * // payouts
 * streamer.<walletAddress>.payouts.<walletAddress>
 */
export const ProfileActionTypes = {
  SET_ETH_ADDRESS: 'SET_ETH_ADDRESS',
  SET_DID: 'SET_DID',
  SET_INFO: 'SET_INFO',
  LOGGING_IN: 'LOGGING_IN',
  READY: 'READY',
  LOGOUT: 'LOGOUT',
  CHECK_CONNECTED_ACCTS: 'CHECK_CONNECTED_ACCTS',
  WELCOME_SHOWN: "WELCOME_SHOWN",
  SET_TWITCH_INFO: 'SET_TWITCH_INFO'
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
  twitchUsername: null,
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

// NOT USED - testing only
export const ActionCheckTwitchLinked = () => {
  return async function(dispatch, getState, {fmWeb3}){

    let state = getState()

    if (!state.drizzleStatus.initialized){
      return
    }

    const profile = state.reducers.profile
    const {twitchId, ethAddress} = profile
    const ORMContract = drizzle.contracts.ORMExternal;

    // if we have twitchId and ethAddress but twitchLinked is still false, we connect them
    if (profile.twitchId && profile.ethAddress && !profile.twitchLinked){

      const viewerTableHash = namehash.hash('viewer')

      console.log('viewer', viewerTableHash)

      const addTableStackId = ORMContract.methods.addTable.cacheSend(viewerTableHash)

      const addTableTxHash = await new Promise((resolve) => {

        const interval = setInterval(() => {

          state = getState()

          const txHash = state.transactionStack[addTableStackId]

          if (state.transactions[txHash] && state.transactions[txHash].status === 'success'){
            clearInterval(interval)
            resolve(txHash)
          }

          // console.log(state.transactions[txHash].status)

        }, 1500)

      })

      // const viewerTwitchId = namehash.hash(`viewer.${ethAddress}.clarenceTest`)

      const addStackId = ORMContract.methods.add.cacheSend(viewerTableHash, ethAddress)

      const addTxHash = await new Promise((resolve) => {

        const interval = setInterval(() => {

          state = getState()

          const txHash = state.transactionStack[addStackId]

          if (state.transactions[txHash] && state.transactions[txHash].status === 'success'){
            clearInterval(interval)
            resolve(txHash)
          }

          // console.log(state.transactions[txHash].status)

        }, 1500)

      })


      const enumerateDataKey = ORMContract.methods.enumerate.cacheCall(viewerTableHash)

      await new Promise((resolve) => {

        const interval = setInterval(() => {

          state = getState()

          console.log(state.contracts)

        }, 1500)

      })
      /*
      const readTxHash = await new Promise((resolve) => {

        const interval = setInterval(() => {

          state = getState()

          const txHash = state.transactionStack[readStackId]

          if (state.transactions[txHash] && state.transactions[txHash].status === 'success'){

            console.log(state.transactions[txHash])

            debugger

            clearInterval(interval)
            resolve(txHash)
          }



        }, 1500)

      })
       */









    }
    // END if

    return Promise.resolve()
  }
}

/**
 * Pass in the newly fetched twitchId and twitchUsername,
 * if the ethAddress is also set, we call the endpoint with the data
 */
export const ActionUpdateTwitch = (tokenData) => {
  return async function(dispatch, getState, {fmWeb3}){

    const twitchId = tokenData.sub

    await dispatch({
      type: ProfileActionTypes.SET_TWITCH_INFO,
      twitchId: twitchId,
      twitchUsername: tokenData.preferred_username
    })

    const state = getState()

    const {ethAddress, twitchLinked} = state.reducers.profile

    // if ethAddress is set too and we have not linked yet, send the data
    if (ethAddress && !twitchLinked){

      const connectUrl = ''

      /*
      await fetch(connectUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          twitchId: twitchId,
          ethAddress: state.reducers.profile.ethAddress
        })
      });
      */


    }

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

      case ProfileActionTypes.SET_TWITCH_INFO:
        return {
          ...state,
          twitchId: action.twitchId,
          twitchUsername: action.twitchUsername
        }
    }

    return state
  }
}
