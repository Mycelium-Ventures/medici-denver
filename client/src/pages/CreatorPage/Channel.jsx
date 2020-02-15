import React, { Component } from "react";

class Accounts extends Component {
  state = {
    connectFB: true,
    connectIN: true,
    connectTW: false,
    connectYT: false
  };
  render() {
    const { connectFB, connectIN, connectTW, connectYT } = this.state;
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
        <div className="row sec-1">
          <div className="col-lg-2 text-left pl-5">
            <h6>Your Channel</h6>
          </div>
        </div>
        <div className="row sec-2">
          <div className="card m-4">
            <div className="card-header">
            <ul className="nav nav-pills card-header-pills">
                <li className="nav-item w-25">Channel Handle</li>
                <li className="nav-item w-50">Content</li>
                <li className="nav-item w-25">Rates</li>
              </ul>
            </div>

            <div className="card-body acc-card c-modal m-4">
              <div className="row inner-row text-left">
                <div className="col-lg-1 pt-2">
                  <img
                    src={require("../../assets/fb.png")}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col-lg-2 pt-2 text-left">
                  <span>Username</span>
                </div>
                <div className="col-lg-6 pt-2 text-center" style={{backgroundColor: "grey"}}>
                  <span>Content</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Likes</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Views</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1 pt-2">
                  <span>...</span>
                </div>
              </div>

              <div className="row inner-row text-left">
                <div className="col-lg-1 pt-2">
                  <img
                    src={require("../../assets/ins.png")}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col-lg-2 pt-2 text-left">
                  <span>Username</span>
                </div>
                <div className="col-lg-6 pt-2 text-center" style={{backgroundColor: "grey"}}>
                  <span>Content</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Likes</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Views</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1 pt-2">
                  <span>...</span>
                </div>
              </div>


              <div className="row inner-row text-left">
                <div className="col-lg-1 pt-2">
                  <img
                    src={require("../../assets/tw.png")}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col-lg-2 pt-2 text-left">
                  <span>Username</span>
                </div>
                <div className="col-lg-6 pt-2 text-center" style={{backgroundColor: "grey"}}>
                  <span>Content</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Likes</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Views</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1 pt-2">
                  <span>...</span>
                </div>
              </div>


              <div className="row inner-row text-left">
                <div className="col-lg-1 pt-2">
                  <img
                    src={require("../../assets/yt.png")}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col-lg-2 pt-2 text-left">
                  <span>Username</span>
                </div>
                <div className="col-lg-6 pt-2 text-center" style={{backgroundColor: "grey"}}>
                  <span>Content</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Likes</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Views</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1 pt-2">
                  <span>...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Accounts;
