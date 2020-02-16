import React, { Component } from "react";

class Campaigns extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <div className="col-12 p-1 m-1 claim-btn text-right">
          <button>Claim 20,000 Free Tokens</button>
        </div>
        <div className="row acc-title p-4 ml-2">
          <div className="col-lg-9 text-left pl-1 mt-3">
          <h6>Platform Subs: 1500</h6>
          </div>
        </div>
      </main>
    );
  }
}

export default Campaigns;
