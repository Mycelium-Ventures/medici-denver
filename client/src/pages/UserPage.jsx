import React, { Component } from "react"


class UserPage extends Component {


    render() {
      return (
        <div>
          <main className="container">
          <div className="row acc-title p-4 ml-2">
            <div className="col-lg-9 text-left pl-1 mt-3">
              <h1>My Points: 20,000</h1>
            </div>
            <div className="col-lg-3 text-center pl-1 mt-4 claim-btn">
              <button><h5>Redeem Points</h5></button>
            </div>
          </div>
          </main>
          <div className="container-fluid">
            <div className="row sec-1">
              <div className="col-lg-4 text-left ml-5">
                <h5>Recently watched videos</h5>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-4">
                <iframe
                  src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
                  height="300"
                  width="400"
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true">
                </iframe>
                <div className="text-left activity ml-5">
                  {/* <h3>20 Kill streak in 2 minutes</h3> */}
                  <h4>You watched this video for 18 minutes and 18 seconds</h4>
                  <h4 style={{color: "#FAA9C6"}}>Earning 24,000 Medici</h4>
                </div>
              </div>
              <div className="col-4">
                <iframe
                  src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
                  height="300"
                  width="400"
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true">
                </iframe>
                <div className="text-left activity ml-5">
                  {/* <h3>20 Kill streak in 2 minutes</h3> */}
                  <h4>You watched this video for 18 minutes and 18 seconds</h4>
                  <h4 style={{color: "#FAA9C6"}}>Earning 24,000 Medici</h4>
                </div>
              </div>
            </div>
            <div className="row pt-2">
              <div className="login-btn mx-auto">
                <button>See more</button>
              </div>
            </div>
            <div className="row sec-1">
              <div className="col-lg-4 text-left ml-5">
                <h5>Recently subscribed pages</h5>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-4">
                <iframe
                  src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
                  height="300"
                  width="400"
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true">
                </iframe>
                <div className="text-left activity ml-5">
                  {/* <h3>20 Kill streak in 2 minutes</h3> */}
                  <h4>You watched this video for 18 minutes and 18 seconds</h4>
                  <h4 style={{color: "#FAA9C6"}}>Earning 24,000 Medici</h4>
                </div>
              </div>
              <div className="col-4">
                <iframe
                  src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
                  height="300"
                  width="400"
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true">
                </iframe>
                <div className="text-left activity ml-5">
                  {/* <h3>20 Kill streak in 2 minutes</h3> */}
                  <h4>You watched this video for 18 minutes and 18 seconds</h4>
                  <h4 style={{color: "#FAA9C6"}}>Earning 24,000 Medici</h4>
                </div>
              </div>
            </div>
            <div className="row pt-2">
              <div className="login-btn mx-auto">
                <button>See more</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default UserPage;