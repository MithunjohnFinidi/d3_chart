import React from 'react';
import {Component} from 'react';
import {sankey} from 'd3-sankey';
import * as d3 from 'd3';

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
        const units = "Widgets";

        const margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = 1200 - margin.left - margin.right,
            height = 740 - margin.top - margin.bottom;

        var formatNumber = d3.format(",.0f"),    
            format = function(d) { return formatNumber(d) + " " + units; },
            color = d3.scaleOrdinal(d3.schemeCategory10);

        const svg = d3.select(this.refs.anchor)
            .attr("width", width)
            .attr("height", height)

        const sankey1 = sankey()
            .nodeWidth(36)
            .nodePadding(10)
            .size([width, height]);

        

        var graph = this.state.sankeyData;

        
        
        var nodeMap = {};
        graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
        graph.links = graph.links.map(function(x) {
            return {
                source: nodeMap[x.source],
                target: nodeMap[x.target],
                value: x.value
            };
        })

        const path = sankey1.links();
        debugger
        const graph1 = sankey()(graph);
        // sankey1
        //     .nodes(graph.nodes)
        //     .links(graph.links)
        //     .layout()

        const link = svg.append("g").selectAll(".link")
                    .data(graph.links)
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", path)
                    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
                    .sort(function(a, b) { return b.dy - a.dy; });
        
        link.append("title")
                    .text(function(d) {
                      return d.source.name + " → " + 
                            d.target.name + "\n" + format(d.value); });
        
        var node = svg.append("g").selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { 
                return "translate(" + d.x + "," + d.y + ")"; })

        node.append("rect")
            .attr("height", function(d) { return d.dy; })
            .attr("width", sankey1.nodeWidth())
            .style("fill", function(d) { 
                return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function(d) { 
                return d3.rgb(d.color).darker(2); })
            .append("title")
            .text(function(d) { 
                return d.name + "\n" + format(d.value); });

        node.append("text")
            .attr("x", -6)
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) { return d.name; })
            .filter(function(d) { return d.x < width / 2; })
            .attr("x", 6 + sankey1.nodeWidth())
            .attr("text-anchor", "start");
    }

    render() {
        return (
            <svg width="960px" height="600px">
            <g ref="anchor"/>
            </svg>
        )
    }
}

export default Sankey;