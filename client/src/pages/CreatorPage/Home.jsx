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
        <div className="row">
          <h6>Dummy text</h6>
        </div>
      </main>
    );
  }
}

export default Overview;
