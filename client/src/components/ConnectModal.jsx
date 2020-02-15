import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ConnectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectFB: false,
      connectIN: false,
      connectTW: false,
      connectYT: false
    };
  }

  render() {
    const { connectFB, connectIN, connectTW, connectYT } = this.state;
    return (
      <Modal
        show={this.props.connectModal}
        animation={false}
        className="connect-modal"
      >
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-11"></div>
              <div className="col-md-1 pr-1">
                <Button
                  className="text-right cl-btn"
                  onClick={() => this.props.onConnect()}
                  variant="none"
                >
                  x
                </Button>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-12 mb-4">
                <h6>Connected Accounts</h6>
              </div>
              <div className="card-body c-modal m-4">
                <div className="row inner-row text-left">
                  <div className="col-lg-2 pt-2">
                    <img
                      src={require("../assets/fb.png")}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="col-lg-7 pt-2 text-center">username</div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button
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
                  <div className="col-lg-7 pt-2 text-center">username</div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button
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
                  <div className="col-lg-7 pt-2 text-center">username</div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button
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
                  <div className="col-lg-7 pt-2 text-center">username</div>
                  <div className="col-lg-2">
                    <div className="col-12 p-1 m-1">
                      <button
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
                <button onClick={() => this.props.connect()}>Login</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ConnectModal;
