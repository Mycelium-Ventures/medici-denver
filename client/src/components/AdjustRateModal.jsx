import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import GoogleLogin from 'react-google-login';

const GOOGLE_CLIENT_ID = '714719547382-nil9jc7gepifi3e4u08v40f6f0s24j71.apps.googleusercontent.com'
const YT_API_KEY = 'AIzaSyCsaYweg-GbZgotY248kb4FniRCOhsQq8Y'

const AdjustRateModal = props => {

  const responseGoogle = (a, b) => {
    console.log('responseGoogle', a, b)
  }

  const adjustRates = (ev) => {
      alert("adjusting rates")
  }

  return (
    <Modal show={props.adjustModal} animation={false} className="signup-modal">
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-11"></div>
            <div className="col-md-1 pr-1">
              <Button
                className="text-right cl-btn"
                onClick={() => props.onAdjust()}
                variant="none"
              >
                x
              </Button>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-12 mb-4">
              <h6>Adjust the rates for this content</h6>
            </div>
            <div className="card-body acc-card c-modal">
                <div className="col-lg-12 text-center">
                    <p style={{fontSize: "1em", fontWeight: "bold", margin: 0, color: "white !important", paddingBottom: "2px"}}>Current Rates</p>
                    <div className="row sec-2">
                    <div className="col-lg-4">
                        <span className="sp-label" style={{color: "rgb(180, 8, 196)"}}>Views</span>
                        <br /> <span >1200</span>
                    </div>
                    <div className="col-lg-4">
                        <span className="sp-label" style={{color: "rgb(180, 8, 196)"}}>Cheers</span>
                        <br /> <span>1200</span>
                    </div>
                    <div className="col-lg-4">
                        <span className="sp-label" style={{color: "rgb(180, 8, 196)"}}>Subs</span>
                        <br /> <span>1200</span>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-8 offset-2 text-left">
              <label for="subs">Subscriber rate</label>
              <input
                type="text"
                placeholder="Enter Medici"
                id="subs"
                className="form-control"
              />
            </div>
            <div className="col-8 offset-2 text-left">
              <label>Per second viewing rate</label>
              <input
                type="text"
                placeholder="Enter Medici"
                className="form-control"
                // onChange={text =>
                // //   this.setState({ password: text.target.value })
                // }
              />
            </div>
            <div className="col-8 offset-2 text-left">
              <label>Follow rate</label>
              <input
                type="text"
                placeholder="Enter Medici"
                className="form-control"
                // onChange={text =>
                // //   this.setState({ password: text.target.value })
                // }
              />
            </div>
            <div className="col-3">
            
            </div>
            <div className="col-12 p-1 m-1 login-btn">
              <button onClick={() => adjustRates()}>Adjust</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AdjustRateModal;
