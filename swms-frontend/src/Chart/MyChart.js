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
				label: 'dryness1',
				data: [],
				fill: false,
				backgroundColor: '#87CEFA',
				borderColor: '#87CEFA',
				hoverBackgroundColor: '#87CEFA',
				hoverBorderColor: '#87CEFA',
				yAxisID: 'y-axis-2'
			},{
				type: 'bar',
				label: 'dryness2',
				data: [],
				fill: false,
				backgroundColor: '#54FF9F',
				borderColor: '#54FF9F',
				hoverBackgroundColor: '#54FF9F',
				hoverBorderColor: '#54FF9F',
				yAxisID: 'y-axis-2'
			},{
				type: 'bar',
				label: 'dryness3',
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
					labelString: 'dryness'
				},
				labels: {
					show: true
				},
				ticks: {
					min: 0,
					max: 1000
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
	if ( minute < 5){
		minute = "00"
	}
	else if (Math.abs(minute-10) <= 5){
		minute = "10"
	}
	else if (Math.abs(minute-20) <= 5){
		minute = "20"
	}
	else if (Math.abs(minute-30) <= 5){
		minute = "30"
	}
	else if (Math.abs(minute-40) <= 5){
		minute = "40"
	}
	else if (Math.abs(minute-50) <= 5){
		minute = "50"
	}
	else if ( 60 - minute <= 5){
		minute = "00"
		if (hour === 23){
			hour = "00"
		}
		else{
			hour += 1
		}
	}
	let result = hour + ":" + minute + ":00"
	return result
}

function finalData (temperature, dryness){
	let data = initData()
	let options = initOptions()

	console.log(temperature)
	console.log(dryness)
	for (let i in temperature){
		let current = temperature[i]
		let processTime = timeProcess(current.ttime)

		if (options.labels.includes(processTime))
			continue
		options.labels.push(processTime)
		options.scales.xAxes[0].labels.push(processTime)
		data.datasets[0].data.push(current.temperature)
	}

	let test = []
	for (let i = 0; i < dryness.length; i++) {
		let current = dryness[i]
		let processTime = timeProcess(current.dtime)

		if (test.includes(processTime)){
			if (test[0] === processTime && i !== 1){
				test = []
				test.push(processTime)
			}
			else
				continue
		}
		test.push(processTime)
		/*
		console.log("i="+i)
		console.log(processTime)
		console.log("cnt="+cnt)
		console.log(options.labels[cnt])
		console.log("########################")
		*/

		data.datasets[current.flower].data.push(current.dryness)
		
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
		this.getdryness(date)
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
  
  	getdryness = (date) => {
		fetch(dataApi + "/dryness?date=" + date + "&flower=0",{
			method: 'get',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(
			(result) => {
				if (result.status){
					console.log("Error!")
					console.log(result.message)
				}
				else{
					//console.log(result)
					this.setState({
						rawdryness: result
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
		if (this.state.rawdryness==null || this.state.rawTemperature==null)
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
		let result = finalData(this.state.rawTemperature, this.state.rawdryness)
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