import React, { Component } from "react";

class Overview extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <div className="col-12 p-1 m-1 claim-btn text-right">
          <button>Claim 20,000 Free Tokens</button>
        </div>
        <div className="row acc-title p-4 ml-2">
          <div className="col-lg-9 text-left pl-1 mt-3">
            <h6>John Starmer</h6>
          </div>
          <div className="col-lg-3 text-right pl-1 mt-3">
            <h6>0$</h6>
          </div>
        </div>
        <div className="row">
          <div className="overview-card text-left">
            <h6>Claim Tokens</h6>
            <p>
              Hi welcome, This page is the general overview section of the admin
              panel which
              <br /> you could edit and modify the view of the page to your
              preffered taste.
            </p>
            <div className="nav-item login-btn">
              <button>Learn More</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Overview;
