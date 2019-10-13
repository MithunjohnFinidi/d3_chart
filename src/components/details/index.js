import React from 'react';
import {Component} from 'react';
import { resolve } from 'path';
import * as d3 from 'd3';
import Donut from '../donut/index';
import Bar from '../bar/index';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.css'

class Details extends Component {

    constructor() {
        super();
        this.state = {
            donutData: null,
            barData: null,
            currentCountry: "India"
        }
    }

    componentDidMount() {
        const promise = new Promise( (resolve, reject) => {
            resolve(d3.json('./donutData.json'))
        }).then((data)=>{
            this.setState({
                donutData: data.India.focus,
                barData: data.India.donors
            })
        })
    }
    handleDropdown = (e) => {
        debugger
        const currentCountry = e.target.text;
        const promise = new Promise( (resolve, reject) => {
            resolve(d3.json('./donutData.json'))
        }).then((data)=>{
            this.setState({
                donutData: data[currentCountry].focus,
                barData: data[currentCountry].donors,
                currentCountry: currentCountry
            })
        })
    }
    render() {
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title="Select a country">
                    <Dropdown.Item onClick={this.handleDropdown}>India</Dropdown.Item>
                    <Dropdown.Item onClick={this.handleDropdown}>Germany</Dropdown.Item>
                </DropdownButton>
                <div className="chartWrapper">
                    <span className="chartHead">
                        <span>Our Focus</span>
                        <span>{this.state.currentCountry}</span>
                    </span>
                    {this.state && this.state.donutData && <Donut data={this.state.donutData}/>}
                </div>
                <div className="chartWrapper">
                    <span className="chartHead">
                        <span>Our Donors</span>
                        <span>{this.state.currentCountry}</span>
                    </span>
                    {this.state && this.state.barData && <Bar data={this.state.barData}/>}
                </div>
            </div>
        )
    }
}

export default Details;