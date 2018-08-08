import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';


class MyMenu extends Component{
    constructor(props){
      	super(props)
      	this.state = {
        	current: 'home',
      	}
    }
    
    handleClick = (e) => {
      	console.log('click ', e);
      	this.setState({
        	current: e.key,
      	});
    }

    render(){
      return(
        <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            >
            <Menu.Item key="home">
                <Link to='/'><Icon type="home" />Home</Link>
            </Menu.Item>
            <Menu.Item key="chart1">
                <Link to='/chart1'><Icon type="eye" />Chart1</Link>
              	</Menu.Item>
        </Menu>
      )
    }
}export default MyMenu