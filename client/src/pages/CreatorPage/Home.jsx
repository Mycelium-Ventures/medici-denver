import React, { useState, useEffect } from "react";
import Chart from "react-highcharts";
import { fmWeb3 } from '../../store'
import numeral from 'numeral'
import ERC20Test from "../../contracts/ERC20Test.json"


const Overview = (props) => {

  const fromAddress = '0xc630fcA4c856a4920976F73375578189A687c031'
  const toAddress = '0xfEB943725Ed070e8D5645736484Ba6494dcBA31a'
  const contractAddress = '0x5cd0065D3fb758b8516C53308dE448023a2512f7'

  const contractInstance = new fmWeb3.eth.Contract(ERC20Test.abi, contractAddress)

  const [balance, setBalance] = useState(0)

  /*
  // send ETH20 test
  contractInstance.methods.transfer(toAddress, 5).send({from: '0xc630fcA4c856a4920976F73375578189A687c031'}, (err, res) => {
    console.log(err, res)
  })
  */

  useEffect(() => {

    contractInstance.methods.balanceOf(fromAddress).call((err, res) => {
      if (err){
        console.error(err)
        return
      }

      setBalance(res)
    })

  }, [])




  var data = [[1220832000000, 800], [1220918400000, 980], [1221004800000, 1400], [1221091200000, 1100], [1221177600000, 1900], [1221436800000, 1400], [1221523200000, 1200], [1221609600000, 800], [1221696000000, 950], [1221782400000, 1300], [1222041600000, 1400], [1222128000000, 1550], [1222214400000, 1700]];

  var config = {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: ''
    },
    caption: {
      style: {
        "color": "#FFF"
      }
    },
    legend: {
      enabled: false
    },
    chart: {
      backgroundColor: "transparent",
      borderWidth: "1",
      borderRadius: "15",
      borderColor: "white",
      plotBorderColor: "white",
      marginTop: 15
    },
    colors: ['#FFF'],
    colorAxis: [{
      girdLineColor: "#FFF",
      lineColor: "#FFF",
      labels: {
        style: {
          color: "#FFF"
        }
      }
    }],
    marker: null,
    maxColor: "blue",
    series: [{
      name: 'AAPL',
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }],
    xAxis: {
      type: 'datetime'
    },
    plotOptions: {
      series: {
        pointStart: Date.UTC(2012, 0, 1),
        pointInterval: 24 * 3600 * 1000
      }
    },
    tooltip: {
      backgroundColor: "#FFF",
      shared: true,
      useHTML: true,
      style: {
        padding: "30",
      },
      headerFormat: '<div class="tool-tip"><p>Week of {point.x}</p><hr/>',
      pointFormat: '<p>1000 points <p/><p class="green-text">+80% Increase</p></div>',
      valueDecimals: 2,
      xDateFormat: '%Y-%m-%d',
    }
  };


  return (
    <main className="container">
      <div className="row acc-title p-4 ml-2">
        <div className="col-lg-9 text-left pl-1 mt-3">
          <h6>Your Platform Subs: 1500</h6>
        </div>
        <div className="col-lg-3 text-right pl-1 mt-3">
          <h6>Your Points: {numeral(balance).format('0,0')}</h6>
        </div>
      </div>
      <div className="row sec-1">
        <div className="col-lg-2 text-left pl-5">
          <h6>Home</h6>
        </div>
      </div>
      <div className="row pt-3">
        <div className="home-points pl-5">
          <span><strong>2000</strong> Points distributed in the last 90 days</span>
          <span className="pl-3 home-points-increase"><strong>+80%</strong> since last week</span>
        </div>
        <hr style={{border: "1px solid white"}}/>
      </div>
      <div className="row">
        <div className="col-lg-12">
        <Chart style={{marginTop: "2px"}}config = {config}></Chart>
        </div>
      </div>
    </main>
  )
}

export default Overview;
