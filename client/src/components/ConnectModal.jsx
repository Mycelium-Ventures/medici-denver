import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import CloseIcon from '@material-ui/icons/Close';
import {authTwitch} from "../services/twitch";
import { connect } from 'react-redux'

/**
 * We query web3 first to check if the user is connected,
 */
class ConnectModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      connectFB: false,
      connectIN: false,
      connectTW: false,
      connectYT: false
    };
    this.connectTwitch = this.connectTwitch.bind(this);
  }

  connectTwitch = (event) => {
    authTwitch();
  }

  renderWelcomeMessage = () => {
    if(this.props.welcome) {
      return (
        <p style={{fontSize: "1em", color: "white"}}>
          Welcome to Medici, to interact with our site connect your social pages.
        </p>
      )
    }
  }

  render() {

    const { connectFB, connectIN, connectTW, connectYT } = this.state;
    // console.log(this.props, "props");

    const connectTWI = this.props.profile.twitchLinked

    return (
      <Modal
        show={this.props.connectModal}
        animation={false}
        className="connect-modal"
      >
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-0 col-md-11"></div>
              <div className="col-12 col-md-1 text-right">
                <Button
                  className="text-right cl-btn"
                  onClick={() => this.props.onConnect(false)}
                  variant="none"
                >
                  <CloseIcon/>
                </Button>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-12 mb-4">
                <h6 style={{fontSize: "2em"}}>Connected Accounts</h6>
                {this.renderWelcomeMessage()}
              </div>
              <div className="card-body c-modal m-4">
                <div className="row inner-row text-left">
                  <div className="col-2 col-lg-2 pt-2">
                    <img
                      src={require("../assets/twitch.png")}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="col-lg-7 pt-2 text-center"></div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button
                        className={`cd-btn ${
                          !connectTWI ? "connect-btn" : "disconnect-btn"
                        }`}
                        onClick={() => this.connectTwitch()}
                      >
                        {`${!connectTWI ? "Connect" : "Disconnect"}`}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row inner-row text-left">
                  <div className="col-lg-2 pt-2">
                    <img
                      src={require("../assets/fb.png")}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="col-lg-7 pt-2 text-center"></div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button disabled
                        className={`cd-btn ${
                          !connectFB ? "connect-btn" : "disconnect-btn"
                        }`}
                        onClick={() => this.setState({ connectFB: !connectFB })}
                      >
                        {`${!connectFB ? "Connect" : "Disconnect"}`}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row inner-row text-left">
                  <div className="col-lg-2 pt-2">
                    <img
                      src={require("../assets/ins.png")}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="col-lg-7 pt-2 text-center"></div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button disabled
                        className={`cd-btn ${
                          !connectIN ? "connect-btn" : "disconnect-btn"
                        }`}
                        onClick={() => this.setState({ connectIN: !connectIN })}
                      >
                        {`${!connectIN ? "Connect" : "Disconnect"}`}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row inner-row text-left">
                  <div className="col-lg-2 pt-2">
                    <img
                      src={require("../assets/tw.png")}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="col-lg-7 pt-2 text-center"></div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button disabled
                        className={`cd-btn ${
                          !connectTW ? "connect-btn" : "disconnect-btn"
                        }`}
                        onClick={() => this.setState({ connectTW: !connectTW })}
                      >
                        {`${!connectTW ? "Connect" : "Disconnect"}`}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row inner-row text-left">
                  <div className="col-lg-2 pt-2">
                    <img
                      src={require("../assets/yt.png")}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="col-lg-7 pt-2 text-center"></div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button disabled
                        className={`cd-btn ${
                          !connectYT ? "connect-btn" : "disconnect-btn"
                        }`}
                        onClick={() => this.setState({ connectYT: !connectYT })}
                      >
                        {`${!connectYT ? "Connect" : "Disconnect"}`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-1 m-1 login-btn">
                <button onClick={() => this.props.onConnect(false)}>Done</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.reducers.profile
  }
}

export default connect(mapStateToProps)(ConnectModal)
