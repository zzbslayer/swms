import React, { Component } from 'react';
import logo from '../logo.svg';

const styles = {
    appTitle: {
        marginRight: '190px',
        fontSize: '4em',
        color: 'aliceblue'
    },
    title: {
        color: 'white',
        textAlign: 'left'
    },
    subtitle: {
        float: 'left',
        color: 'white'
    },
    appHeader: {
        backgroundColor: '#222',
        height: '300px',
        padding: '5px',
        color: 'white'
    },
    appLogo: {
        animation: 'App-logo-spin infinite 20s linear',
        height: '80px'
    }
}

class Header extends Component{

    render(){
        const title = this.props.title
        return(
            <div>
                <header style={styles.appHeader}>
                <div>
                <h2 style={styles.title}>&nbsp;&nbsp;SWMS | Smart Watering and Monitoring System</h2>
                <h3 style={styles.subtitle}>&nbsp;&nbsp;Visualization of SWMS </h3>
                <h1 style={styles.appTitle}>{title}</h1>
                </div>
                <img src={logo} style={styles.appLogo} alt="logo" />
                </header>
            </div>
        );
    }
}
export default Header;