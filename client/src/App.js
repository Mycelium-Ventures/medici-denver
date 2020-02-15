import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";

import { connect } from 'react-redux'
import Loading from './pages/Loading'

import { Route, Switch, Redirect } from "react-router-dom";

import routes from './routes'

import { ActionCheckAccts } from './store/redux/profile'

import { DrizzleContext } from "@drizzle/react-plugin"
import { newContextComponents } from "@drizzle/react-components"

const { ContractData } = newContextComponents

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
)

const App = (props) => {

  const drizzleContext = useContext(DrizzleContext.Context)

  const { drizzle, drizzleState } = drizzleContext

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
  }, [props.drizzleStatus.initialized])

  if (!props.profile.ready){
    return <Loading/>
  }

  return (
    <div className="App body">
      <React.Suspense fallback={loading()}>
        <Header/>
        {/* <SignUpModal
          onSignUp={this.handleSignUpModal}
          signupModal={this.state.signupModal}
        />
        */}
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="ERC20Test"
          method="balanceOf"
          methodArgs={["0xc630fcA4c856a4920976F73375578189A687c031"]}
          render={data => data}
        />

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
      </React.Suspense>
    </div>
  );

}

// this gets spread directly on props
// if this result changes there will be a re-render as well
const mapStateToProps = (state) => {
  return {
    profile: state.reducers.profile,
    drizzleStatus: state.drizzleStatus
  }
}

export default connect(mapStateToProps)(App)
