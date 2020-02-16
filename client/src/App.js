import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";

import { connect } from 'react-redux'
import Loading from './pages/Loading'

import { Route, Switch } from "react-router-dom";

import routes from './routes'

import { ActionCheckAccts, ActionCheckTwitchLinked } from './store/redux/profile'
import { welcomeShown } from './store/redux/profile';

import ConnectModal from "./components/ConnectModal";

// import { DrizzleContext } from "@drizzle/react-plugin"
// import { newContextComponents } from "@drizzle/react-components"
// const { ContractData } = newContextComponents

const App = (props) => {

  // const drizzleContext = useContext(DrizzleContext.Context)

  // const { drizzle, drizzleState } = drizzleContext

  // handleRoute = () => {
  // <Router>
  //   <Route
  //     path="/Creator"
  //     exact
  //     render={() => {
  //       return <LandingPage />;
  //     }}
  //   />
  // </Router>;
  // };

  // const showConnect = !props.profile.youtubeLinked

  /*
  ******************************************************************
  * We always check web3 on startup to see if there are connected
  * accounts
  ******************************************************************
   */
  useEffect(() => {
    props.dispatch(ActionCheckAccts())
  }, []) // [props.drizzleInitialized])



  //Initialising welcome modals to users without twitch id
  const [connect, setConnect] = useState(false);



  useEffect(() => {
    if(!(props.profile.twitchLinked) && !(props.profile.welcomeShown)) {
      setConnect(true);
      props.dispatch(welcomeShown())
    }
  })


  /*
  useEffect(() => {
    props.dispatch(ActionCheckTwitchLinked())
  }, [props.drizzleInitialized, props.profile.twitchId, props.profile.ethAddress])
  */

  if (!props.profile.ready){
    return <Loading/>
  }

  return (
    <div className="App body">
        <Header/>
        <ConnectModal
          welcome={true}
          connectModal={connect}
          onConnect={setConnect}
        />
        {/* <SignUpModal
          onSignUp={this.handleSignUpModal}
          signupModal={this.state.signupModal}
        />

        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="ERC20Test"
          method="balanceOf"
          methodArgs={["0xc630fcA4c856a4920976F73375578189A687c031"]}
          render={data => data}
        />
        */}

        <Switch>
          {/* Mapping path to page/component in ./routes */}
          {_.map(routes, (item, i) => {
            const props = _.omit(item, ['page', 'path', 'type']);
            const R = item.type || Route;
            return (
              <R
                path={item.path}
                key={i}
                exact={true}
                component={item.page}
                {...props}
              />
            )
          })}
        </Switch>
    </div>
  );

}

// this gets spread directly on props
// if this result changes there will be a re-render as well
const mapStateToProps = (state) => {
  return {
    profile: state.reducers.profile,
    drizzleInitialized: state.drizzleStatus.initialized
  }
}

export default connect(mapStateToProps)(App)
