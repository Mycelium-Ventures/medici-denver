import React, { Component } from "react";

class Overview extends Component {
  state = {};
  render() {
    return (
      <main className="container">

        <div className="row acc-title p-4 ml-2">
          <div className="col-lg-9 text-left pl-1 mt-3">
            <h6>John Starmer</h6>
          </div>
          <div className="col-lg-3 text-right pl-1 mt-3">
            <h6>0$</h6>
          </div>
        </div>
        <div className="row sec-1">
          <div className="col-lg-2 text-left pl-5">
            <h6>Wallet</h6>
            <hr style={{border: "0.8px solid white"}}/>
          </div>
        </div>
        <div className="row">
          <div className="overview-card text-left">
            <h6>Claim Tokens</h6>
            <p>
            Hi Creator, the purpose of our site is not for you to loose money. But for you<br/> to gain an audience
              Request a grant and our team will be more than willing<br/> to give you free Medici if your account fits.
            </p>
            <div className="nav-item login-btn">
              <button>Request Grant</button>
            </div>
          </div>
        </div>
        <div className="row sec-1 mt-5">
          <div className="col-lg-2 text-left pl-5">
            <h6>Your Points</h6>
          </div>
        </div>
        <div className="row mt-5">
            <div className="col-lg-12">
              <h1 style={{color: "white"}}>20,000
                <img
                src={require("../../assets/coin.png")}
                width={50}
                height={50}
                className="pl-1"
              />
            </h1>
            </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="nav-item login-btn">
              <button>Buy More</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Overview;
