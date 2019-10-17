import React from 'react';
import {Component} from 'react';
import * as d3_sankey from 'd3-sankey';
import * as d3 from 'd3';
import './style.css';

class Sankey extends Component {
    constructor() {
        super();
        this.state = {
          sankeyData: null
        }
    }

    componentWillMount() {
        let promise = new Promise( (resolve, reject) => {
            resolve(d3.json("sankeyData.json"))
        }).then( (response) => {
            this.setState({
                sankeyData: response
            })
        })
    }

    componentDidUpdate() {
        var svg = d3.select("#sankeyChart svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var formatNumber = d3.format(",.0f"),
            format = function(d) { return formatNumber(d) + " TWh"; },
            color = d3.scaleOrdinal(d3.schemeCategory10);

        var sankey = d3_sankey.sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 6]]);

        var link = svg.append("g")
            .attr("class", "links")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .selectAll("path");

        var node = svg.append("g")
            .attr("class", "nodes")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g");

        var graph;

        const promise = new Promise( (resolve, reject) => {
                resolve(d3.json('./sankeyTestData.json'))
        }).then( (energy) => {
            graph = sankey(energy);

            var link1 = link
            .data(energy.links)
            .enter().append("path")
                .attr("class", "link")
                .attr("d", d3_sankey.sankeyLinkHorizontal())
                .attr("stroke-width", function(d) { return Math.max(1, d.width); });

                link1.append("title")
                .text(function(d) { return d.source.name + " → " + d.target.name + "\n$" + d.value; });
        
            var node1 = node
                .data(energy.nodes)
                .enter().append("g")
        
            node1.append("rect")
                .attr("x", function(d) { return d.x0; })
                .attr("y", function(d) { return d.y0; })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("width", function(d) { return d.x1 - d.x0; })
                .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
        
            node1.append("text")
                .attr("x", function(d) { return d.x0 - 6; })
                .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
                .attr("dy", "0.35em")
                .attr("text-anchor", "end")
                .text(function(d) { return d.name; })
                .filter(function(d) { return d.x0 < width / 2; })
                .attr("x", function(d) { return d.x1 + 6; })
                .attr("text-anchor", "start");
        
            node1.append("title")
                .text(function(d) { return d.name + "\n" + format(d.value); });
        })
  

    }

    render() {
        return (
            <div id="sankeyChart">
                <svg width="960" height="500"></svg>
            </div>
        )
    }
}

export default Sankey;