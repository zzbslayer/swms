import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Header from '../Utils/Header';
import { DatePicker, Button } from 'antd';
import { dataApi } from '../Global';

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
				label: 'Humidity1',
				data: [],
				fill: false,
				backgroundColor: '#87CEFA',
				borderColor: '#87CEFA',
				hoverBackgroundColor: '#87CEFA',
				hoverBorderColor: '#87CEFA',
				yAxisID: 'y-axis-2'
			},{
				type: 'bar',
				label: 'Humidity2',
				data: [],
				fill: false,
				backgroundColor: '#54FF9F',
				borderColor: '#54FF9F',
				hoverBackgroundColor: '#54FF9F',
				hoverBorderColor: '#54FF9F',
				yAxisID: 'y-axis-2'
			},{
				type: 'bar',
				label: 'Humidity3',
				data: [],
				fill: false,
				backgroundColor: '#FF6A6A',
				borderColor: '#FF6A6A',
				hoverBackgroundColor: '#FF6A6A',
				hoverBorderColor: '#FF6A6A',
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
				barPercentage: 0.5,
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

function timeProcess(time){
	let array = time.split(':')
	let hour = parseInt(array[0], 10)
	let minute = parseInt(array[1], 10)
	if (minute < 0 || minute > 60)
		return -1
	if ( minute < 10){
		minute = "00"
	}
	if ( 60 - minute <= 10){
		minute = "00"
		if (hour === 23){
			hour = "00"
		}
		else{
			hour += 1
		}
	}
	if ( Math.abs(minute-30) <= 10){
		minute = "30"
	}
	let result = hour + ":" + minute + ":00"
	return result
}

function finalData (temperature, humidity){
	let data = initData()
	let options = initOptions()

	/* counter for the 2nd for-loop */

	for (let i in temperature){
		let current = temperature[i]
		let processTime = timeProcess(current.ttime)
		//console.log(processTime)
		options.labels.push(processTime)
		options.scales.xAxes[0].labels.push(processTime)
		data.datasets[0].data.push(current.temperature)
	}

	let cnt = 0	
	for (let i = 0; i < humidity.length; i++) {
		let current = humidity[i]
		let processTime = timeProcess(current.htime)
		console.log("i="+i)
		console.log(processTime)
		console.log("cnt="+cnt)
		console.log(options.labels[cnt])
		console.log("########################")
		if (processTime === options.labels[cnt]){
			data.datasets[current.flower].data.push(current.humidity)
		}
		else if (processTime < options.labels[cnt]){
			/* 
				loss of temperature point
				1. insert humidity data
				2. insert null temperature data
			*/
			data.datasets[current.flower].data.push(current.humidity)
			options.labels.splice(cnt, 0, processTime)
			options.scales.xAxes[0].labels.splice(cnt, 0, processTime)
			data.datasets[0].data.splice(cnt, 0, null)
		}
		else{
			/*
				loss of humidity point
				1. insert null humidity data
				2. keep i unchange
			*/
			data.datasets[current.flower].data.push(null)
			i-=1
		}
		cnt++
		if (options.labels.length === cnt){
			cnt = 0
		}
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
        maxWidth:'1000px',
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
		let date = this.props.match.params.date
		//console.log(date);
		this.getHumidity(date)
		this.getTemperature(date)
	}

	onChange = (date, dateString) => {
		//console.log(date);
		//console.log(dateString);
		this.setState({chosenDate: dateString})
	}

	onClick = () => {
		window.location.href = '/chart/'+this.state.chosenDate
	}
  
  	getHumidity = (date) => {
		fetch(dataApi + "/humidity?date=" + date + "&flower=0",{
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
					//console.log(result)
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

	getTemperature = (date) => {
		fetch(dataApi + "/temperature?date=" + date,{
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
                    <Header title="CHART"/>
					<br/><br/><br/>
					<DatePicker onChange={this.onChange} />
					&nbsp;&nbsp;&nbsp;
					<Button type="primary" size="large" onClick={this.onClick}>Confirm</Button>
					<br/><br/><br/>
                    <h2>No Data</h2>
                </div>
            )
		let result = finalData(this.state.rawTemperature, this.state.rawHumidity)
		return (
            <div>
                <Header title="CHART"/>
				<br/><br/><br/>
				<DatePicker onChange={this.onChange} />
				&nbsp;&nbsp;&nbsp;
				<Button type="primary" size="large" onClick={this.onClick}>Confirm</Button>
                <br/><br/><br/>
				<h2>{this.props.match.params.date}</h2>
                <div style={styles.graphContainer}>
                    <Bar data={result.data}  options={result.options}/>
                </div>
            </div>
			
		)
	}
}

export default MyChart;