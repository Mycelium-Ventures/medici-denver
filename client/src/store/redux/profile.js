import namehash from 'eth-ens-namehash'
import axios from 'axios'
import drizzle, { fmWeb3 } from '../index'

import { createTable, addAddressToTable } from "../../services/contract";
import ORMExternal from '../../contracts/ORMExternal'

function bufferToBytes32(buffer) {
  const padding = new Buffer(32 - buffer.length);
  return Buffer.concat([padding, buffer])
}

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
  SET_TWITCH_INFO: 'SET_TWITCH_INFO',
  SET_TWITCH_LINKED: 'SET_TWITCH_LINKED'
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

  // not used - but we fetch the transaction receipt
  // really just doing this to prove the web3 Fortmatic works for calls
  twitchLinkedProof: null,

  ytLinked: false,
  did: null,
  name: '',
  welcomeShown: false
}

// this only runs once on startup
export const ActionCheckAccts = () => {
  return async function(dispatch, getState, { fmWeb3 }){

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
  return async function(dispatch, getState, { fmWeb3 }){

    let state = getState()

    if (!state.drizzleStatus.initialized){
      return
    }

    const profile = state.reducers.profile
    const { twitchId, ethAddress } = profile
    const ORMContract = drizzle.contracts.ORMExternal;

    // if we have twitchId and ethAddress but twitchLinked is still false, we connect them
    //TODO: change true
    if (true && profile.ethAddress && !profile.twitchLinked){

      // const viewerTableHash = await createTable("viewer");
      // console.log(viewerTableHash)

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

      //viewer table... ethaddress

      console.log('addAddressToTable', viewerTableHash, ethAddress)
      await addAddressToTable(viewerTableHash, ethAddress);

      // const addStackId = ORMContract.methods.add.cacheSend(viewerTableHash, ethAddress)
      // const addTxHash = await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     state = getState()
      //     const txHash = state.transactionStack[addStackId]
      //     if (state.transactions[txHash] && state.transactions[txHash].status === 'success'){
      //       clearInterval(interval)
      //       resolve(txHash)
      //     }
      //     // console.log(state.transactions[txHash].status)
      //   }, 1500)
      // })

      /*
      const enumerateDataKey = ORMContract.methods.enumerate.cacheCall(viewerTableHash)

      await new Promise((resolve) => {

        const interval = setInterval(() => {

          state = getState()

          console.log(state.contracts)

        }, 1500)

      })
      */
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
  return async function(dispatch, getState){

    const twitchId = tokenData.sub

    await dispatch({
      type: ProfileActionTypes.SET_TWITCH_INFO,
      twitchId: twitchId,
      twitchUsername: tokenData.preferred_username
    })

    const state = getState()

    const { ethAddress, twitchLinked } = state.reducers.profile

    // if ethAddress is set too and we have not linked yet, send the data
    if (true){ // ethAddress && !twitchLinked){

      const connectUrl = 'http://a114762ce4ea811eabb0f0ae02d88c5b-1117862074.us-east-1.elb.amazonaws.com/v2/specs/a155630985594b6c91f947d74d693434/runs'

      /*
      const resp = await axios.post(connectUrl, {
        twitchId: twitchId.toString(),
        ethAddress: state.reducers.profile.ethAddress
      }, {
        method: 'POST',
        headers: {
          'X-Chainlink-EA-AccessKey': '29fc945b88f5485daf5160d0132c0e2a',
          'X-Chainlink-EA-Secret': 'HG0JaTfwm35pCQNUgcWvuksXJDazML0PDmfqByWghTWxWtLx7y7Fh4qJH5HD6grT',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json'
        }
      })


      debugger
      */

      await dispatch({
        type: ProfileActionTypes.SET_TWITCH_LINKED
      })
    }

    return Promise.resolve()
  }
}

// TEST ONLY
export const ActionCreateORMData = () => {
  return async function(dispatch, getState, { fmWeb3 }){

    const contractAddress = '0x737B262BFcD16A11dF2F3A681fDf15218Ef6eC20'

    const contractInstance = new fmWeb3.eth.Contract(ORMExternal.abi, contractAddress)

    // const tableHash = namehash.hash('viewer')

    const ethAddress = getState().reducers.profile.ethAddress

    // const ethAddress32Bytes = bufferToBytes32(Buffer.from(fmWeb3.utils.hexToBytes(ethAddress)));

    // console.log('ActionCreateORMData', tableHash, ethAddress)

    // const res = await contractInstance.methods.remove(tableHash, '0x2ee0d0c04d5d8a9db51ffb3f5ccb604ec70d2be1011af8822de77d549180dda9').send({from: ethAddress})


    // START reward fake data
    const videoId = '492575058' // Medici
    // const videoId = '492564773' // Jake
    // const videoId = '137492398' // Taregant

    const twitchId = videoId
    const videoTwitchIdHash = namehash.hash(`twitchId.${videoId}.video.${twitchId}.views`);

    const res = await contractInstance.methods.addTable(videoTwitchIdHash).send({from: ethAddress})

    console.log(res || null)

    return Promise.resolve()
  }
}

export const ActionGetTwitchLinkedProof = () => {
  return async function(dispatch, getState, { fmWeb3 }){

    const contractAddress = '0x737B262BFcD16A11dF2F3A681fDf15218Ef6eC20'

    const contractInstance = new fmWeb3.eth.Contract(ORMExternal.abi, contractAddress)

    // this has the binding data
    const viewerTableHash = namehash.hash('viewer')

    // const mediciActivityHash = namehash.hash(`video.492575058.twitchId.492575058.views`)

    // const taregantActivityHash = namehash.hash(`video.137492398.twitchId.137492398.views`)

    // const jakeActivityHash = namehash.hash(`video.492564773.twitchId.492564773.views`)

    let result = null

    try {
      result = await contractInstance.methods.getTables().call()
    } catch (err){
      console.error(err)
    }

    console.log('result', result)

    return Promise.resolve()
  }
}

//Simple function to set welcome shown to true
export const welcomeShown = () => {
  return async function(dispatch, getState, { fmWeb3 }){
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

    switch (action.type){
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

      case ProfileActionTypes.SET_TWITCH_LINKED:
        return {
          ...state,
          twitchLinked: true
        }
    }

    return state
  }
}
