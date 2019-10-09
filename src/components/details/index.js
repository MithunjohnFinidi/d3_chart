import React from 'react';
import {Component} from 'react';
import { resolve } from 'path';
import * as d3 from 'd3';
import Donut from '../donut/index';

class Details extends Component {

    constructor() {
        super();
        this.state = {
            donutData: null
        }

        
    }

    componentDidMount() {
        const promise = new Promise( (resolve, reject) => {
            resolve(d3.json('./donutData.json'))
        }).then((data)=>{
            this.setState({
                donutData: data.india
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Details</h1>
                {this.state && this.state.donutData && <Donut data={this.state.donutData}/>}
            </div>
        )
    }
}

export default Details;