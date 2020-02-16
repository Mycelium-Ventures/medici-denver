import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {buy} from "../services/contract";

async function buyMore (amount) {
  var result = await buy()
  console.log(result);
}

const BuyModal = props => {
  const [amount, setAmount] = useState("");

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
              <h6>Buy Medici</h6>
            </div>
            <div className="col-8 offset-2 text-left">
              <label>Follow rate</label>
              <input
                type="text"
                placeholder="Enter Medici"
                className="form-control"
                value={amount}
                style={{color: "white"}}
                onChange={text => setAmount(text.target.value)}
              />
            </div>
            <div className="col-12 p-1 m-1 login-btn">
              <button onClick={(ev) => buyMore(amount)}>Buy</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BuyModal;
