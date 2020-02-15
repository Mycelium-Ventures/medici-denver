import React, { Component } from "react";
import logo from "./logo.svg";

import _ from 'lodash';

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";

import SignUpModal from "./components/SignUpModal";
import ConnectModal from "./components/ConnectModal";

import { DrizzleContext } from "@drizzle/react-plugin"

import drizzle from "./store"

import { HashRouter, Route, Switch } from "react-router-dom";
import routes from './routes'

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
)

class App extends Component {


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

  render() {
    return (
      <div className="App body">
        <DrizzleContext.Provider drizzle={drizzle}>
          <HashRouter>
            <React.Suspense fallback={loading()}>
              <Header/>
              {/* <SignUpModal
                onSignUp={this.handleSignUpModal}
                signupModal={this.state.signupModal}
              />
              <ConnectModal
                onConnect={this.handleConnectModal}
                connectModal={this.state.connectModal}
              /> */}
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
          </HashRouter>
        </DrizzleContext.Provider>
      </div>
    );
  }
}

export default App;
