import React, { Component } from "react";
import logo from "./logo.svg";

import _ from 'lodash';

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";

import SignUpModal from "./components/SignUpModal";
import ConnectModal from "./components/ConnectModal";

import { HashRouter, Route, Switch } from "react-router-dom";
import routes from './routes'

class App extends Component {
  state = {
    signupModal: false,
    connectModal: false
  };

  handleSignUpModal = () => {
    this.setState({ signupModal: !this.state.signupModal });
  };

  handleConnectModal = () => {
    this.setState({ connectModal: !this.state.connectModal });
  };

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
        <HashRouter>
          <Header
            onLogin={this.handleSignUpModal}
            onConnect={this.handleConnectModal}
          />
          <SignUpModal
            onSignUp={this.handleSignUpModal}
            signupModal={this.state.signupModal}
          />
          <ConnectModal
            onConnect={this.handleConnectModal}
            connectModal={this.state.connectModal}
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
        </HashRouter>
      </div>
    );
  }
}

export default App;
