import namehash from 'eth-ens-namehash'
import _ from 'lodash'
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
  SET_TWITCH_LINKED: 'SET_TWITCH_LINKED',
  SET_VIDEO_DATA: 'SET_VIDEO_DATA',
  SET_CHANNEL_PARAMS: 'SET_CHANNEL_PARAMS'
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
  welcomeShown: false,
  videos: {},
  channelParams: {}
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
    if (profile.twitchId && profile.ethAddress && !profile.twitchLinked){

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

      const connectUrl = `http://bp2jemn2ji.execute-api.us-east-1.amazonaws.com/dev/proxy?twitchId=${twitchId}&ethAddress=${state.reducers.profile.ethAddress}`

      const resp = await fetch(connectUrl, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'omit'
      })

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



    const ethAddress = getState().reducers.profile.ethAddress



    let tableHash = namehash.hash(`dev.twitchId`)

    await contractInstance.methods.addTable(tableHash).send({from: ethAddress})

    await contractInstance.methods.add(tableHash, fmWeb3.eth.abi.encodeParameter('uint256', 137492398)).send({from: ethAddress})

    tableHash = namehash.hash(`dev.twitchId.137492398.channel`)

    await contractInstance.methods.addTable(tableHash).send({from: ethAddress})

    await contractInstance.methods.add(tableHash, fmWeb3.eth.abi.encodeParameter('uint256', 25199180)).send({from: ethAddress})

    tableHash = namehash.hash(`dev.twitchId.137492398.channel.25199180.views`)

    await contractInstance.methods.addTable(tableHash).send({from: ethAddress})

    await contractInstance.methods.add(tableHash, fmWeb3.eth.abi.encodeParameter('uint256', 165000)).send({from: ethAddress})


    /*
    const tableHash = namehash.hash(`dev.twitchId.${137492398}.channel.${25199180}.views`)

    await contractInstance.methods.addTable(tableHash).send({from: ethAddress})

    const timeEncoded = fmWeb3.eth.abi.encodeParameter('uint256', 165000);

    const res = await contractInstance.methods.add(tableHash, timeEncoded).send({from: ethAddress})
    */

    // const ethAddress32Bytes = bufferToBytes32(Buffer.from(fmWeb3.utils.hexToBytes(ethAddress)));

    // console.log('ActionCreateORMData', tableHash, ethAddress)

    // const res = await contractInstance.methods.remove(tableHash, '0x2ee0d0c04d5d8a9db51ffb3f5ccb604ec70d2be1011af8822de77d549180dda9').send({from: ethAddress})


    // START reward fake data
    /*
    const videoId = '492575058' // Medici
    // const videoId = '492564773' // Jake
    // const videoId = '137492398' // Taregant

    const twitchId = videoId
    const videoTwitchIdHash = namehash.hash(`twitchId.${videoId}.video.${twitchId}.views`);

    // const res = await contractInstance.methods.addTable(videoTwitchIdHash).send({from: ethAddress})


     */
    // console.log(res || null)

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

export const ActionSetChannelParams = (chanParams) => {
  return async function(dispatch, getState, { fmWeb3 }){

    const state = getState()

    const {twitchId, ethAddress} = state.reducers.profile

    const contractAddress = '0x737B262BFcD16A11dF2F3A681fDf15218Ef6eC20'

    const contractInstance = new fmWeb3.eth.Contract(ORMExternal.abi, contractAddress)

    // take chanParams and make it 3 comma separated numbers - TODO: learn a better way to compress (structs?)
    const chanParamsCsv = `${chanParams.subRate},${chanParams.perSecRate},${chanParams.cheerRate}`

    const chanParams32Bytes = '0x' + bufferToBytes32(Buffer.from(chanParamsCsv, 'ascii')).toString("hex");

    console.log('chanParams32Bytes', chanParams32Bytes)

    const tableHash = namehash.hash(`dev.twitchId.${twitchId}.channelParams`)
    await contractInstance.methods.addTable(tableHash).send({from: ethAddress})
    await contractInstance.methods.add(tableHash, chanParams32Bytes).send({from: ethAddress})

    await dispatch({
      type: ProfileActionTypes.SET_CHANNEL_PARAMS,
      channelParams: chanParams
    })

    return Promise.resolve()
  }
}

export const ActionGetChannelParams = () => {
  return async function(dispatch, getState, { fmWeb3 }){

    const state = getState()

    const {twitchId, ethAddress} = state.reducers.profile

    const contractAddress = '0x737B262BFcD16A11dF2F3A681fDf15218Ef6eC20'

    const contractInstance = new fmWeb3.eth.Contract(ORMExternal.abi, contractAddress)

    const tableHash = namehash.hash(`dev.twitchId.${twitchId}.channelParams`)

    const chanParamsHex = await contractInstance.methods.enumerate(tableHash).call()

    let chanParamsHexTrim = _.trimStart(chanParamsHex[0].substring(2, chanParamsHex[0].length), '0')

    const chanParamsCsv = Buffer.from(chanParamsHexTrim, 'hex').toString()

    if (chanParamsCsv.length <= 0){
      return Promise.resolve()
    }

    let chanParams = chanParamsCsv.split(',')

    await dispatch({
      type: ProfileActionTypes.SET_CHANNEL_PARAMS,
      channelParams: {
        subRate: parseInt(chanParams[0]),
        perSecRate: parseInt(chanParams[1]),
        cheerRate: parseInt(chanParams[2])
      }
    })

    return Promise.resolve()
  }
}

/**
 * Get all the video watch times and add them into a struct
 */
export const ActionGetVideoMetrics = () => {
  return async function(dispatch, getState, { fmWeb3 }){

    console.log('ActionGetVideoMetrics')

    const contractAddress = '0x737B262BFcD16A11dF2F3A681fDf15218Ef6eC20'

    const contractInstance = new fmWeb3.eth.Contract(ORMExternal.abi, contractAddress)

    // get all videos
    const twitchHashed = namehash.hash('dev.twitchId')

    const twitchIds = await contractInstance.methods.enumerate(twitchHashed).call()

    console.log('twitchIds', twitchIds)

    if (twitchIds.length <= 0){
      return Promise.resolve()
    }

    const data = {}

    // loop through each video and get twitchIds
    for (let i = 0, twitchIdsLen = twitchIds.length; i < twitchIdsLen; i++){
      let twitchId = parseInt(twitchIds[i], 16)

      // console.log(twitchId)

      data[twitchId] = {}

      let videoTwitchHash = namehash.hash(`dev.twitchId.${twitchId}.channel`)
      let channelIds = await contractInstance.methods.enumerate(videoTwitchHash).call()

      // console.log('channelIds', channelIds)

      // loop through each video/twitchId and get the time
      for (let j = 0; j < channelIds.length; j++){

        let channelId = parseInt(channelIds[j], 16)

        let connectUrl = `https://api.twitch.tv/helix/users?id=${channelId}`

        // fetch the channel meta data
        const resp = await fetch(connectUrl, {
          method: 'GET',
          headers: {
            'Client-ID': 'e2oo0q2wfiu9x3r0fzkh7cornp3652'
          }
        })

        let twitchChannelTimeHash = namehash.hash(`dev.twitchId.${twitchId}.channel.${channelId}.views`)
        let viewTimes = await contractInstance.methods.enumerate(twitchChannelTimeHash).call() // can be multiple

        let totalTime = 0
        viewTimes.forEach((time) => {
          totalTime += parseInt(time, 16)
        })

        data[twitchId][channelId] = {
          viewTime: totalTime,
          metadata: await resp.json()
        }
      }
    }

    await dispatch({
      type: ProfileActionTypes.SET_VIDEO_DATA,
      videos: data
    })

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

      case ProfileActionTypes.SET_VIDEO_DATA:
        return {
          ...state,
          videos: action.videos
        }

      case ProfileActionTypes.SET_CHANNEL_PARAMS:
        return {
          ...state,
          channelParams: action.channelParams
        }
    }

    return state
  }
}
