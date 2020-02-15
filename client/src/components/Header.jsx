import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  // state = {  }
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
            <a className="nav-link" onClick={() => this.props.onConnect()}>
              Account
            </a>
          </li>
          <li className="nav-item login-btn">
            <button onClick={() => this.props.onLogin()}>Login</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
