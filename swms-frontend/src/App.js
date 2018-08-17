import React, { Component } from 'react';
import MyChart from './Chart/MyChart';
import MyMenu from './MyMenu/MyMenu';
import Home from './Home/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			result: null,
		}
  	}

	render() {
		return (
			<div className="App">
				<Router>
				<div>
					<MyMenu/>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/chart/:date" component={MyChart}></Route>
				</div>
				</Router>
			</div>
		)
	}
}

export default App;
