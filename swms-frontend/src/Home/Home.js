import React, { Component } from 'react';
import { Avatar } from 'antd';
import Header from '../Utils/Header'

class Home extends Component {

	render() {
		return (
		<div className="App">
			<Header title="SWMS"/>
			<div style={{ background: '#ECECEC', padding: '30px', height:'800px' }}>
				<br/><br/>
				<Avatar size={64} src="http://r.photo.store.qq.com/psb?/V11ZRoyG3eakT8/0LG8k1U5maRN8p1TqH*kjKGpZ7ILWNCdcyN1JEM0LSs!/r/dIUBAAAAAAAA" />
				<br/><br/>
				<h2 className = "footnote1">"Jiansi Wang is my father."</h2>
				<h2 className = "footnote2">——Zihan Chou </h2>
			</div>
		</div>
		);
	}
}

export default Home;
