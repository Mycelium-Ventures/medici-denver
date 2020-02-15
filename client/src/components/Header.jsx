import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  // state = {  }

  login = (ev) => {
    // const script = document.createElement("script");
    // script.src = "https://apis.google.com/js/client.js";

    // script.onload = () => {
    //   gapi.load('client', () => {
    //     gapi.client.setApiKey("AIzaSyCsaYweg-GbZgotY248kb4FniRCOhsQq8Y");
    //     gapi.client.load('youtube', 'v3', () => {
    //       this.setState({ gapiReady: true });
    //     });
    //   });
    // };

    // document.body.appendChild(script);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light nav-header">
        <Link className="navbar-brand" to="/">
          <img src={require("../assets/logo.png")} width={120} height={50} />
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/creator">
              Content Creator
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              Account
            </a>
          </li>
          <li className="nav-item login-btn">
            <button onClick={() => this.login()}>Login</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
