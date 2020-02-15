

/**
 * Redux - Profile
 */
export const ProfileActionTypes = {
  SET_FMID: 'SET_FMID',
  SET_DID: 'SET_DID',
  SET_INFO: 'SET_INFO',
  LOGGING_IN: 'LOGGING_IN',
  READY: 'READY',
  LOGOUT: 'LOGOUT',
  CHECK_CONNECTED_ACCTS: 'CHECK_CONNECTED_ACCTS'
};

/*
*************************************************************************************
* Store Schema
*************************************************************************************
 */
const initialState = {
  ready: false,
  loading: true,
  twitchLinked: false,
  ytLinked: false,
  did: null,
  name: 'Clarence Liu'
}

export const ActionCheckAccts = () => {
  return async function(dispatch, getState, {web3}){

    // let acctAddress = await web3.currentProvider.enable()

    await new Promise((resolve) => {
      setTimeout(() => resolve(), 3000)
    })

    dispatch({
      type: ProfileActionTypes.READY
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

      case ProfileActionTypes.SET_FMID:
        return {
          ...state,
          loading: false
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
