import Nav from 'react-bootstrap/Nav';
import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import Tabs from './tabs';
import './style.css';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: window.location.pathname.substr(1) || 'home'
        }
    }

    setActiveTab = (name) => {
        this.setState({
            selectedTab: name
        })
    }
    render() {

        const {selectedTab} = this.state;
        return (
            <ul>
                <Tabs name="home" link="/home" content="Home" isActive = {selectedTab === 'home'} onChange={this.setActiveTab}/>
                <Tabs name="details" link="/details" content="Details" isActive = {selectedTab === 'details'} onChange={this.setActiveTab}/>
            </ul>
        )
    }
}

export default Navbar;
