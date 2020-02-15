import React, { Component } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;
    return (
      <main className="container">
        <div className="row sec-1">
          <div className="col-4 col-lg-1 text-left pl-5 mt-5">
            <h6>Trending</h6>
          </div>
          <div className="col-2 col-lg-1 text-left pl-4 mt-5">
            <MoreHorizIcon
              style={{ color: "white", cursor: "pointer" }}
              onClick={this.handleClick}
            />
            <div className={`drp-down ${open ? "open" : ""}`}>
              <ul>
                <li className="li-item1">Trending</li>
                <li className="li-item2">Most Recent</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9"></div>
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
            <div className="card-body m-4">
              <div className="row inner-row text-left">
                <div className="col-lg-5 pt-2 pl-5">Client 123</div>
                <div className="col-lg-5 pt-2">-------------------</div>
                <div className="col-lg-1">
                  <span className="sp-label">Likes</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-1">
                  <span className="sp-label">Views</span>
                  <br /> <span>1200</span>
                </div>
              </div>
            </div>

            <div className="card-footer nav-item showmore-btn">
              <button>View More</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default LandingPage;
