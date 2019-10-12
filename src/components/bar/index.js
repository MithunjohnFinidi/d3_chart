import React from 'react';
import {Component} from 'react';
import * as d3 from 'd3';
import tip from 'd3-tip';
import './style.css';

class Bar extends Component {

    constructor() {
        super();
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        if(this.props.data && this.props.data.length !== 0) {
            this.setState({
                data: this.props.data
            })
            this.drawBarChart();
        }
    }

    drawBarChart = () => {
        let data = this.props.data;

        var margin = {top: 40, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var formatPercent = d3.format(".0%");

        const tip1 = tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.name + "<br></span>" + "<strong>Expenses: </strong><span class='details'>" + d.total_budget +"%</span>";
            })

        var x = d3.scaleBand()
            .rangeRound([0, width])

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom(x)

        var yAxis = d3.axisLeft(y)

        var svg = d3.select("#barChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip1);
        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.total_budget; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", 70)
            .attr("y", function(d) { return y(d.total_budget); })
            .attr("height", function(d) { return height - y(d.total_budget); })
            .on('mouseover', tip1.show)
            .on('mouseout', tip1.hide)

    }

    render() {
        return (
            <div id="barChart"></div>
        )
    }
}

export default Bar;