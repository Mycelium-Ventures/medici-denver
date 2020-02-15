import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import GoogleLogin from 'react-google-login';

const GOOGLE_CLIENT_ID = '714719547382-nil9jc7gepifi3e4u08v40f6f0s24j71.apps.googleusercontent.com'
const YT_API_KEY = 'AIzaSyCsaYweg-GbZgotY248kb4FniRCOhsQq8Y'

const SignUpModal = props => {

  const responseGoogle = (a, b) => {
    console.log('responseGoogle', a, b)
  }

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
              <GoogleLogin
                apiKey={YT_API_KEY}
                clientId={GOOGLE_CLIENT_ID}
                scope="https://www.googleapis.com/auth/youtube"
                discoveryDocs={['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
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
