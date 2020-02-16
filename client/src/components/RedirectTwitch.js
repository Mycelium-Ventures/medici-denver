import React, { useEffect, useState } from "react";
import Loading from '../pages/Loading'
import queryString from 'query-string'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { Redirect } from "react-router-dom";
import { ActionUpdateTwitch } from '../store/redux/profile'

/**
 * We parse the JWT for the twitch userId and username and send it to an endpoint
 * with the ethAddress
 */
const RedirectTwitch = (props) => {

  const [done, setDone] = useState(false)

  // TODO: in the future we can query https://api.twitch.tv/helix/users?login=137492398

  // e.g. #access_token=fcod56832t0zzzvwsaajf1lse2b8m4&id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ.eyJhdWQiOiJlMm9vMHEyd2ZpdTl4M3IwZnpraDdjb3JucDM2NTIiLCJleHAiOjE1ODE4MTY5MDMsImlhdCI6MTU4MTgxNjAwMywiaXNzIjoiaHR0cHM6Ly9pZC50d2l0Y2gudHYvb2F1dGgyIiwic3ViIjoiMTM3NDkyMzk4IiwiYXRfaGFzaCI6IlAxU3ZCaVl5bTZHTHFXT1VHOVYwcGciLCJhenAiOiJlMm9vMHEyd2ZpdTl4M3IwZnpraDdjb3JucDM2NTIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJUYXJlZ2FudCJ9.jTi-C1Q20ZMujdylCwa_lTB9yEf_Cp8F0kjNCO_-TV_O5TGoBmwlWrh2G-uqAboG044_RDy07KG-UWczUARjmxF-Nl0OAaBhEroSduqyVTKTK1FgOaKNrd3SZZ47cm_Fadr_6GuOEvLr2lhEw_lof9vWHuIj500l2jrk5D2uR3dL7gqOeASHdvdh5cXDyGzMbBqVI1wzT5w1STkJimbAjQyRlsRiHawyg79fmlc8ZGUaS38OU7qv5nqvsBxqIv37Kk2X18RTarDW8skkaH9EGwqhtpKdmmf8XYdniaqjLyNBwj8hSPvdu7_ndmL5fTD1L-X7QQ_4h5HYAY3yg9kCoA&scope=user%253Aedit+openid&token_type=bearer
  const urlHash = props.location.hash

  const { id_token } = queryString.parse(urlHash)

  const tokenData = jwtDecode(id_token)

  useEffect(() => {
    props.dispatch(ActionUpdateTwitch(tokenData)).then(() => {
      setDone(true)
    })
  }, [])

  if (!done){
    return <Loading/>
  }

  return <Redirect to="/"/>
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(RedirectTwitch)
