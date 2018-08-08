import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Header from '../Utils/Header';
import { dataApi } from '../Global';

//const now = (new Date().toLocaleDateString()).replace(/\//g,'-')
const now = '2018-08-07'
console.log(now)

function initData(){
	return {
		datasets: [{
				label: 'Temperature',
				type:'line',
				data: [],
				fill: false,
				borderColor: '#EC932F',
				backgroundColor: '#EC932F',
				pointBorderColor: '#EC932F',
				pointBackgroundColor: '#EC932F',
				pointHoverBackgroundColor: '#EC932F',
				pointHoverBorderColor: '#EC932F',
				yAxisID: 'y-axis-1'
			},{
				type: 'bar',
				label: 'Humidity',
				data: [],
				fill: false,
				backgroundColor: '#87CEFA',
				borderColor: '#87CEFA',
				hoverBackgroundColor: '#87CEFA',
				hoverBorderColor: '#87CEFA',
				yAxisID: 'y-axis-2'
			}]
	}
}

function initOptions (){
	return {
		responsive: true,
		labels: [],
		tooltips: {
			mode: 'label'
		},
		elements: {
			line: {
			fill: false
			}
		},
		scales: {	
			xAxes: [
			{
				display: true,
				gridLines: {
				display: false
				},
				barThickness : 60,
				labels: [],
			}
			],
			yAxes: [
			{
				type: 'linear',
				display: true,
				position: 'left',
				id: 'y-axis-1',
				gridLines: {
					display: false
				},
				scaleLabel: {
					display: true,
					labelString: 'Temperature'
				},
				labels: {
					show: true
				},
				ticks: {
					min: 10,
					max: 35
				}
			},
			{
				type: 'linear',
				display: true,
				position: 'right',
				id: 'y-axis-2',
				gridLines: {
					display: false
				},
				scaleLabel: {
					display: true,
					labelString: 'Humidity'
				},
				labels: {
					show: true
				},
				ticks: {
					min: 0,
					max: 1
				}
			}
			]
		}
	}
};

function finalData (temperature, humidity){
	let data = initData()
	let options = initOptions()
	for (let i in humidity){
		options.labels.push(humidity[i].htime)
		options.scales.xAxes[0].labels.push(humidity[i].htime)
		data.datasets[1].data.push(humidity[i].humidity)
	}
	for (let i in temperature){
		data.datasets[0].data.push(temperature[i].temperature)
	}
	let result = {}
	result.data = data
	result.options = options
	return result
}
  
/*
const plugins = [{
	afterDraw: (chartInstance, easing) => {
		const ctx = chartInstance.chart.ctx;
		ctx.fillText("This text drawn by a plugin", 100, 100);
	}
}]
*/

const styles = {
    graphContainer:{
        padding: '15px',
        width:'1000px',
        margin: 'auto',
    }
}

/*
const initHumidity = [
    {
        "hid": 1,
        "hdate": "2018-08-07",
        "htime": "21:53:57",
        "humidity": 0.641
    },
    {
        "hid": 2,
        "hdate": "2018-08-07",
        "htime": "21:58:57",
        "humidity": 0.612
    },
    {
        "hid": 3,
        "hdate": "2018-08-07",
        "htime": "22:03:57",
        "humidity": 0.563
    },
    {
        "hid": 4,
        "hdate": "2018-08-07",
        "htime": "22:08:57",
        "humidity": 0.624
    },
    {
        "hid": 5,
        "hdate": "2018-08-07",
        "htime": "22:13:57",
        "humidity": 0.592
    },
    {
        "hid": 6,
        "hdate": "2018-08-07",
        "htime": "22:18:57",
        "humidity": 0.512
    }
]
const initTemperature = [
    {
        "tid": 1,
        "tdate": "2018-08-07",
        "ttime": "21:53:57",
        "temperature": 30.1
    },
    {
        "tid": 2,
        "tdate": "2018-08-07",
        "ttime": "21:58:57",
        "temperature": 28.1
    },
    {
        "tid": 3,
        "tdate": "2018-08-07",
        "ttime": "22:03:57",
        "temperature": 26.4
    },
    {
        "tid": 4,
        "tdate": "2018-08-07",
        "ttime": "22:08:57",
        "temperature": 23.2
    },
    {
        "tid": 5,
        "tdate": "2018-08-07",
        "ttime": "22:13:57",
        "temperature": 21.5
    },
    {
        "tid": 6,
        "tdate": "2018-08-07",
        "ttime": "22:18:57",
        "temperature": 22.9
    }
]
*/

class MyChart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			result: null,
		}
  	}

	componentDidMount = () => {
		this.getHumidity()
		this.getTemperature()
	}
  
  	getHumidity = () => {
		fetch(dataApi + "/humidity?date=" + now,{
			method: 'get',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(
			(result) => {
				if (result.status){
					console.log("Error!")
					console.log(result.msg)
				}
				else{
					console.log(result)
					this.setState({
						rawHumidity: result
					})
				}
			},
			(error) => {
				console.log("Error!")
				console.log(error)
			}
		)
	}

	getTemperature = () => {
		fetch(dataApi + "/temperature?date=" + now,{
			method: 'get',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(
			(result) => {
				if (result.status){
					console.log("Error!")
					console.log(result.msg)
				}
				else{
					this.setState({
						rawTemperature: result
					})
				}
			},
			(error) => {
				console.log("Error!")
				console.log(error)
			}
		)
	}

	render() {
		if (this.state.rawHumidity==null || this.state.rawTemperature==null)
			return (
                <div style={styles.container}>
                    <Header title="Chart1"/>
                    <h2>No Data</h2>
                </div>
            )
		let result = finalData(this.state.rawTemperature, this.state.rawHumidity)
		return (
            <div>
                <Header title="Chart1"/>
                <br/><br/><br/>
                <div style={styles.graphContainer}>
                    <Bar data={result.data}  options={result.options}/>
                </div>
            </div>
		)
	}
}

export default MyChart;