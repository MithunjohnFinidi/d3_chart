import React from 'react';
import {Component} from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';
import tip from 'd3-tip';
import './style.css'

class WorldMap extends Component {

    constructor() {
      super();
      this.state = {
        worldData: null,
        population: null
      }
    }

    componentWillMount() {

      Promise.all([
        d3.json("worldgeo.json"),
        d3.json("population.json"), 
      ]).then( response => {
          this.setState({
            worldData: response[0].features,
            population: response[1]
          })
      })
    }

    componentDidUpdate() {
      const  format = d3.format(",");
      const tip1 = tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Expenses: $</strong><span class='details'>" + format(d.population) +"</span>";
            })

      var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      const color = d3.scaleThreshold()
      .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
      .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"])
        
        var path = d3.geoPath();

      const svg = d3.select(this.refs.anchor)
                .attr("width", width)
                .attr("height", height)


      const projection = d3.geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);
      
      var path = d3.geoPath().projection(projection);

      svg.call(tip1);

      var populationById = {};

      const data = this.state.worldData,
            population = this.state.population;

      population.forEach(function(d) { populationById[d.id] = +d.population.replace(/"/g, "") });
      data.forEach(function(d) { d.population = populationById[d.id] });
      svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(populationById[d.id])})
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip1.show(d, this);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip1.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  svg.append("path")
      .datum(topojson.mesh(data, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);

    }

    render() {
      const {worldData, population} = this.state;
      return (
        <svg width="960px" height="600px">
          <g ref="anchor"/>
        </svg>
      )
        
    }
}

export default WorldMap;