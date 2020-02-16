import React, { Component } from "react";
import Chart from "react-highcharts";

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
        pointFormat: '<p>{point.y} points <p/><p class="green-text">+80% Increase</p></div>',
        valueDecimals: 2,
        xDateFormat: '%Y-%m-%d',
    }
}

class Graph extends Component {

    // console.log(Date.UTC)
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                <Chart style={{marginTop: "2px"}}config = {config}></Chart>
                </div>
            </div>
        )}
};

export default Graph;