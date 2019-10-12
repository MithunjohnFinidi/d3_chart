import React from 'react';
import {Component} from 'react';
import { resolve } from 'path';
import * as d3 from 'd3';
import Donut from '../donut/index';
import Bar from '../bar/index';

class Details extends Component {

    constructor() {
        super();
        this.state = {
            donutData: null,
            barData: null
        }
    }

    componentDidMount() {
        const promise = new Promise( (resolve, reject) => {
            resolve(d3.json('./donutData.json'))
        }).then((data)=>{
            this.setState({
                donutData: data.india.focus,
                barData: data.india.donors
            })
        })
    }
    render() {
        return (
            <div>
                <div>
                    {this.state && this.state.donutData && <Donut data={this.state.donutData}/>}
                </div>
                <div>
                    {this.state && this.state.barData && <Bar data={this.state.barData}/>}
                </div>
            </div>
        )
    }
}

export default Details;