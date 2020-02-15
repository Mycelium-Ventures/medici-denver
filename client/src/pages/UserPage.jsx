import React, { Component } from "react"


class UserPage extends Component {


    render() {
      return (
        <main className="container">
        <div className="row acc-title p-4 ml-2">
          <div className="col-lg-9 text-left pl-1 mt-3">
            <h6>Your Platform Subs: 1500</h6>
          </div>
          <div className="col-lg-3 text-right pl-1 mt-3">
            <h6>Your Points: 20,000</h6>
          </div>
        </div>
      </main>
      );
    }
}

export default UserPage;