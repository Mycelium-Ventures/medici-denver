import React, { useState, useEffect } from "react";
import ActivityLog from "../components/ActivityLog";
import numeral from 'numeral'
import { connect } from 'react-redux'
import _ from 'lodash'
// import EmbedTwitch from "../components/EmbedTwitch";
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import {HashLoader} from "react-spinners";

import { getBalance } from "../services/contract";


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



const UserPage = (props) => {
  const [balance, setBalance] = useState(0)
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!props.profile.ethAddress){
      return;
    }
    getBalance(props.profile.ethAddress).then((res) => {
      setBalance(res)
      setLoading(false);
    })
  }, [])

  function renderUserVideos() {
    const videos = props.profile.videos;

    const channels = []
    for (let twitchId in videos){
      for (let channelId in videos[twitchId]){
        channels.push(videos[twitchId][channelId])
      }
    }

    return _.map(channels, (channel) => {

      return (
        <div className="row sec-2">
          <div className="card-body acc-card c-modal m-4">
            <div className="row inner-row text-left">
              <div className="col-lg-3 pt-2">
                <img
                  src={require("../assets/twitch.png")}
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
                {/* <EmbedTwitch /> */}
                <ReactTwitchEmbedVideo
                  height={400}
                  width={750}
                  autoplay={true}
                  channel={channel.metadata.data[0].login} />
                {/* <iframe
                  src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
                  height="300"
                  width="600"
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true">
                </iframe> */}
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

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
      <div>
        <main className="container">
        <div className="row acc-title p-4 ml-2">
          <div className="col-lg-9 text-left pl-1 mt-3">
            <h1>My Points: {numeral(balance).format('0,0')}</h1>
          </div>
          <div className="col-lg-3 text-center pl-1 mt-3 claim-btn">
            <button><h5>Redeem Points</h5></button>
          </div>
        </div>
        </main>

        <div className="container">
          <ActivityLog data={activityDummy}/>
          <br/>
          <div className="row sec-1">
            <div className="col-lg-4 text-left pl-5">
              <h6>Recently watched videos</h6>
              <hr style={{border: "0.8px solid white"}}/>
            </div>
          </div>
          {renderUserVideos()}
          <div className="row sec-2">
            <div className="card-body acc-card c-modal m-4">
              <div className="row inner-row text-left">
                <div className="col-lg-3 pt-2">
                  <img
                    src={require("../assets/yt.png")}
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
                  <hr style={{border: "0.8px solid white"}}/>
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
                  <iframe width="750" height="400"
                    src="https://www.youtube.com/embed/z1rwRzPlR8Q"
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

  const mapStateToProps = (state) => {
    return {
      profile: state.reducers.profile
    }
  }
  export default connect(mapStateToProps)(UserPage);
