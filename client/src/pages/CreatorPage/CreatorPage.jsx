import React, { Component } from "react";
import Channel from "./Channel";
import Rewards from "./Rewards";
import Home from "./Home";
import Wallet from "./Wallet";

class CreatorSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true,
      channel: false,
      wallet: false,
      rewards: false
    };
  }

  activeSidebar = tab => {
    switch (tab) {
      case 1:
        this.setState({
          home: true,
          channel: false,
          wallet: false,
          rewards: false
        });
        break;
      case 2:
        this.setState({
          home: false,
          channel: true,
          wallet: false,
          rewards: false
        });
        break;
      case 3:
        this.setState({
          home: false,
          channel: false,
          wallet: true,
          rewards: false        });
        break;
      case 4:
        this.setState({
          home: false,
          channel: false,
          wallet: false,
          rewards: true
        });
        break;

      default:
        this.setState({
          home: true,
          channel: false,
          wallet: false,
          rewards: false
        });
    }
  };

  render() {
    const { home, channel, wallet, rewards, } = this.state;
    return (
      <div className="">
        <div className="row">
          <div className="sidenav col-3">
            <a
              className={`${home ? "active" : ""}`}
              onClick={() => this.activeSidebar(1)}
            >
              <img
                src={require("../../assets/side-icons.png")}
                width={30}
                height={30}
              />
              Home
            </a>
            <a
              className={`${channel ? "active" : ""}`}
              onClick={() => this.activeSidebar(2)}
            >
              <img
                src={require("../../assets/side-icons.png")}
                width={30}
                height={30}
              />
              Your Channel
            </a>
            <a
              className={`${wallet ? "active" : ""}`}
              onClick={() => this.activeSidebar(3)}
            >
              <img
                src={require("../../assets/side-icons.png")}
                width={30}
                height={30}
              />
              Wallet
            </a>
            <a
              className={`${rewards ? "active" : ""}`}
              onClick={() => this.activeSidebar(4)}
            >
              <img
                src={require("../../assets/side-icons.png")}
                width={30}
                height={30}
              />
              Manage Rewards
            </a>
          </div>
          <div className="col-9">
            {home ? <Home /> : ""}
            {channel ? <Channel /> : ""}
            {wallet ? <Wallet /> : ""}
            {rewards ? <Rewards /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default CreatorSidebar;
