import React, { useState, useEffect } from "react";
import { fmWeb3 } from '../../store'
import numeral from 'numeral'
import { connect } from 'react-redux'
import Graph from "../../components/Graph";
import {HashLoader} from "react-spinners";
import ActivityLog from "../../components/ActivityLog";

import { getBalance } from "../../services/contract";

//Dummy data
const activityDummy = [{
    username: "johnjohn",
    action: "subcribed to your account",
    medici: 3000
  }, {
    username: "tonyHawk",
    action: "watched your video for 9 Hours 2 minutes",
    medici: 1000000
  }, {
    username: "stingyUser",
    action: "watched your video for 1 minutes",
    medici: 0.002
  }]


const Home = (props) => {

  /*
  const fromAddress = '0x09D2c8b17A9498dbDc4a909096DF484C46149e3c'
  const toAddress = '0xfEB943725Ed070e8D5645736484Ba6494dcBA31a'
  */


  const [balance, setBalance] = useState(0)
  const [isLoading, setLoading] = useState(true);

  /*
  // send ETH20 test
  contractInstance.methods.transfer(toAddress, 5).send({from: '0xc630fcA4c856a4920976F73375578189A687c031'}, (err, res) => {
    console.log(err, res)
  })
  */

  useEffect(() => {

      if (!props.profile.ethAddress){
        return;
      }
      getBalance(props.profile.ethAddress).then((res) => {
        setBalance(res)
        setLoading(false);
      })
  }, [])
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
      <div className="row acc-title p-4 ml-2">
        <div className="col-lg-9 text-left pl-1 mt-3">
          <h6>Platform Subs: 1500</h6>
        </div>
        <div className="col-lg-3 text-right pl-1 mt-3">
          <h6>Points: {numeral(balance).format('0,0')}</h6>
        </div>
      </div>
      <div className="row sec-1">
        <div className="col-lg-2 text-left pl-5">
          <h6>Home</h6>
          <hr style={{border: "0.8px solid white"}}/>
        </div>
      </div>
      <ActivityLog data={activityDummy} />
      <div className="row pt-3">
        <div className="home-points pl-5">
          <span><strong>2000</strong> Points distributed in the last 90 days</span>
          <span className="pl-3 home-points-increase"><strong>+80%</strong> since last week</span>
        </div>
        <hr style={{border: "1px solid white"}}/>
      </div>
      <Graph />
    </main>
  )
}
const mapStateToProps = (state) => {
  return {
    profile: state.reducers.profile
  }
}
export default connect(mapStateToProps)(Home);
