import React, { Component } from "react";
import Chart from "react-highcharts";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

class Overview extends Component {
  state = {};

  
  render() {
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
            <h6>John Starmer</h6>
          </div>
          <div className="col-lg-3 text-right pl-1 mt-3">
            <h6>0$</h6>
          </div>
        </div>
        <div className="row">
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
    );
  }
}

export default Overview;
