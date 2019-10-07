import React from 'react';
import {Component} from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client";
import { scaleThreshold } from 'd3-scale';
import Tooltip from './tooltip'

const colorScale = scaleThreshold().domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
                                    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"])

class WorldMap extends Component {

    constructor() {
        super();
        this.state = {
            worldData: [],
            population: [],
            populationById: [],
            hover: "none",
            hoveredValue: null,
            xScale: 0,
            yScale: 0         
        }
        
        let promise1 = fetch('/worldgeo.json');
        let promise2 = fetch('/population.json');

        Promise
            .all([
                promise1, promise2
            ])
            .then(resolve => {
                    resolve[0].json().then(worldData => {
                        this.setState({
                            worldData: worldData.features,
                        })
                    })

                    resolve[1].json().then(population => {
                        this.setState({
                            population
                        })
                        population.forEach( (d)=> {
                            debugger
                            this.state.populationById[d.id] = +d.population.replace(/"/g, "");
                        })
                    })
            });
    }

    projection = () => {
        return geoMercator()
          .scale(100)
          .translate([ 800 / 2, 450 / 2 ])
    }

    componentDidMount = () => {
        let promise1 = fetch('/worldgeo.json');
        let promise2 = fetch('/population.json');

        Promise
            .all([
                promise1, promise2
            ])
            .then(resolve => {
                    resolve[0].json().then(worldData => {
                        this.setState({
                            worldData: worldData.features,
                        })
                    })

                    resolve[1].json().then(population => {
                        this.setState({
                            population
                        })
                        population.forEach( (d)=> {
                            this.state.populationById[d.id] = +d.population.replace(/"/g, "");
                        })
                    })
            });

        // fetch('/worldgeo.json').then(response => {
        //     if (response.status !== 200) {
        //         console.log(`There was a problem: ${response.status}`)
        //         return
        //     }
        //     response.json().then(worldData => {
        //         this.setState({
        //             worldData: worldData.features,
        //         })
        //     })
        // })
    }

    handleCountryClick = (d) => {
        debugger
        this.setState({
            hover: d.id,
            hoveredValue: d,
            xScale: window.event.clientX,
            yScale: window.event.clientY
        })
        // console.log("Clicked on a country: ", this.state.worldData[countryIndex])
      }

    render() {
        return (
            <div>
          <svg width={ 900 } height={ 450 } viewBox="0 0 800 450">
            <g className="countries">
              {
                this.state.worldData.map((d,i) => (
                  <path
                    key={ `path-${ i }` }
                    d={ geoPath().projection(this.projection())(d) }
                    className="country"
                    fill={ colorScale(this.state.populationById[d.id]) }
                    stroke="#FFFFFF"
                    strokeWidth={ 0.5 }
                    onMouseEnter={ () => this.handleCountryClick(d) }
                    onMouseOut={ () => this.setState({hoveredValue: null}) }
                    style={{stroke: this.state.hover === d.id ? "white" : colorScale(this.state.populationById[d.id]), strokeWidth: 1.5 }}
                  />
                ))
              }
            </g>
          </svg>
          { this.state.hoveredValue ?
            <Tooltip
              hoveredBar={this.state.hoveredValue}
              scales={{ xScale : this.state.xScale, yScale:this.state.yScale }}
            /> :
            null
          }
          </div>
        )
      }
}

export default WorldMap;