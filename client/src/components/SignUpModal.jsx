import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

const SignUpModal = props => {
  return (
    <Modal show={props.signupModal} animation={false} className="signup-modal">
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-11"></div>
            <div className="col-md-1 pr-1">
              <Button
                className="text-right cl-btn"
                onClick={() => props.onSignUp()}
                variant="none"
              >
                x
              </Button>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-12 mb-4">
              <h6>Sign up through formatic</h6>
            </div>
            <div className="col-8 offset-2 text-left">
              <label for="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="form-control"
                // onChange={text =>
                //   this.setState({ email: text.target.value })
                // }
              />
            </div>
            <div className="col-8 offset-2 text-left">
              <label>Password</label>
              <input
                type="text"
                placeholder="xxxxxxx"
                className="form-control"
                // onChange={text =>
                // //   this.setState({ password: text.target.value })
                // }
              />
            </div>
            <div className="col-12 p-1 m-1 login-btn">
              <button onClick={() => props.onSignUp()}>Login</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
