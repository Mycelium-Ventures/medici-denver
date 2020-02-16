import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

const BuyModal = props => {

  const responseGoogle = (a, b) => {
    console.log('responseGoogle', a, b)
  }

  const adjustRates = (ev) => {
      alert("adjusting rates")
  }

  return (
    <Modal show={props.buyModal} animation={false} className="signup-modal">
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-11"></div>
            <div className="col-md-1 pr-1">
              <Button
                className="text-right cl-btn"
                onClick={() => props.closeModal()}
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
              <button onClick={() => buy()}>Buy</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BuyModal;
