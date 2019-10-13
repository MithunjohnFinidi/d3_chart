import React from 'react';
import {Component} from 'react';
import * as d3 from 'd3';
import tip from 'd3-tip';
import './style.css';

class Donut extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        if(this.props.data.length !== 0) {
            this.state = {
                data: this.props.data
            }
            this.drawDonut(this.state.data);
        }
    }

    componentWillReceiveProps(prevState) {
        debugger
        d3.select("svg").remove();
        this.drawDonut(prevState.data);
    }

    drawDonut = (chartData) => {
        let data = chartData;

        const  format = d3.format(",");
        const tip1 = tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.data.sector + "<br></span>" + "<strong>Expenses: </strong><span class='details'>" + d.value +"%</span>";
            })

        var width = 400,
            height = 400,
            radius = Math.min(width, height) / 2,
            labelr = radius + 40,
            outerRadius = radius - 10,
            innerRadius = radius - 70;

        var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.percentage;
            })
            .padAngle(0);

            var svg = d3.select('#donutChart')
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform",
                "translate(" + width / 2 + "," + height / 2 + ") scale(0.7, 0.7)");

                svg.call(tip1);

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
debugger
        var newArcs = g.append("path")
            .attr("d", arc)
            .style("fill", function (d) { return "#" + (d.data.color || d.data.sector_color); })
            debugger
        var [firstArc, ...lastArc] = newArcs._groups[0];
        firstArc.style.opacity = 1;
        firstArc.setAttribute("transform", 'scale(1.025,1.025)');
        firstArc.style.stroke = "#eee"
        firstArc.style.strokeWidth = "1px"
        lastArc.forEach((item) => {
            item.style.transform = 'scale(1, 1)';
            item.style.stroke = "#eee"
            item.style.strokeWidth = "1px"
        })
        var that = this;
        newArcs.on('mouseover', function(d) {
            d3.select("g").selectAll("path")
                .style('transform', 'scale(1,1)')
                .style('opacity', 1);

            let current = d3.event.target;
            current.style.transform = 'scale(1.025,1.025)';
            current.style.stroke = "#eee"
            current.style.strokeWidth = "1px"

            tip1.show(d, this);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })

        newArcs.on('mouseout', function(d){
            tip1.hide(d);
  
            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
          });
    }

    render() {
        return (
            <div id="donutChart"></div>
        )
    }
}

export default Donut;