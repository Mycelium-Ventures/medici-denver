import React, { useState, useEffect } from "react";
import numeral from 'numeral'
import { connect } from 'react-redux'
import {HashLoader} from "react-spinners";
import AdjustModal from "../../components/AdjustRateModal";

import { getBalance } from "../../services/contract";


const Channel = (props) => {
  // state = {
  //   adujustModal: false
  // };


  const [balance, setBalance] = useState(0)
  const [isLoading, setLoading] = useState(true);
  const [adjustModal, setAdjustModal] = useState(false);



  useEffect(() => {
    if (!props.profile.ethAddress){
      return;
    }
    getBalance(props.profile.ethAddress).then((res) => {
        setBalance(res)
        setLoading(false);
    })
  }, [])

  // adjustRates = (ev) => {
    
  // }



  if(isLoading) {
    return (
      <div class="d-flex justify-content-center m-5">
          <HashLoader
            size={150}
            color={"#ce60a5"}
            loading={isLoading}
          />
      </div>
  )
}
  return (
    <main className="container">
      {/* <AdjustModal
        onAdjust={adjustRates()}
        adjustModal={adjustModal}
      /> */}
      <div className="row acc-title p-4 ml-2">
        <div className="col-lg-9 text-left pl-1 mt-3">
          <h6>Platform Subs: 1500</h6>
        </div>
        <div className="col-lg-3 text-right pl-1 mt-3">
          <h6>Points: Points: {numeral(balance).format('0,0')}</h6>
        </div>
      </div>
      <div className="row sec-1">
        <div className="col-lg-2 text-left pl-5">
          <h6>My Channel</h6>
          <hr style={{border: "0.8px solid white"}}/>
        </div>
      </div>
      <div className="row sec-2">
        <div className="card-body acc-card c-modal m-4">
          <div className="row inner-row text-left">
            <div className="col-lg-3 pt-2">
              <img
                src={require("../../assets/twitch.png")}
                width={50}
                height={50}
              />
              <p>Username</p>
              <p style={{fontSize: "1em", fontWeight: "bold", margin: 0}}>Rates</p>
              <div className="row">
                <div className="col-lg-4">
                  <span className="sp-label">Views</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-4">
                  <span className="sp-label">Cheers</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-4">
                  <span className="sp-label">Subs</span>
                  <br /> <span>1200</span>
                </div>
              </div>
              <div className="row pt-2">
                <div className="login-btn mx-auto">
                  <button>Adjust Rates</button>
                </div>
              </div>
              <hr style={{border: "0.5px solid white"}}/>
              <p style={{fontSize: "1em", fontWeight: "bold", margin: 0, paddingTop: "1px"}}>Medici Sent</p>
              <div className="row">
                <div className="col-lg-4">
                  <span className="sp-label">Views</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-4">
                  <span className="sp-label">Cheers</span>
                  <br /> <span>1200</span>
                </div>
                <div className="col-lg-4">
                  <span className="sp-label">Subs</span>
                  <br /> <span>1200</span>
                </div>
              </div>
            </div>
            <div className="col-lg-9 pt-2 text-center">
            <iframe
              src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
              height="300"
              width="600"
              frameborder="0"
              scrolling="no"
              allowfullscreen="true">
            </iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.reducers.profile
  }
}
export default connect(mapStateToProps)(Channel);
