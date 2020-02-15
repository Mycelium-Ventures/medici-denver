

/**
 * Redux - Profile
 */
export const ProfileActionTypes = {
  SET_FMID: 'SET_FMID',
  SET_DID: 'SET_DID',
  SET_INFO: 'SET_INFO',
  LOGGING_IN: 'LOGGING_IN',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

/*
*************************************************************************************
* Store Schema
*************************************************************************************
 */
const initialState = {
  ready: false,
  loading: true,
  fmId: null,
  did: null,
  name: ''
}

/*
*************************************************************************************
* Reducer
*************************************************************************************
 */
export default {

  profile: (state = initialState, action) => {

    switch (action.type) {
      case ProfileActionTypes.LOGIN:
        return {
          ...state,
          fmId: action.fmId,
          loading: false
        }

      case ProfileActionTypes.LOGOUT:
        return {
          ...state,
          did: null,
          fmId: null,
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
          fmId: action.fmId,
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
