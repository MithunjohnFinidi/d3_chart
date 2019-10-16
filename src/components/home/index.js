import React from 'react';
import { Component } from 'react';
import WorldMap from '../worldmap/index';
import Sankey from '../sankey/index';
import './style.css';

class Home extends Component {
    render() {
        return (
            <div>
                <div className="worldmap_container">
                    <WorldMap />
                </div>
                <div className="sankey_container">
                    <div className="legend_container">
                        <span className="legend_row">
                            <span className="legend_row_title">Budget Sources</span>
                            <span className="legend_row_desc">Where our resources come from</span>
                        </span>
                        <span className="legend_row">
                            <span className="legend_row_title">Recipient Region</span>
                            <span className="legend_row_desc">Where our resources go</span>
                        </span>
                        <span className="legend_row">
                            <span className="legend_row_title">Our Focus</span>
                            <span className="legend_row_desc">What our resources are spent on</span>
                        </span>
                        <span className="legend_row">
                            <span className="legend_row_title">Signature Solutions</span>
                            <span className="legend_row_desc">Which solutions are applied</span>
                        </span>
                    </div>
                    <Sankey />
                </div>
            </div>
        )

    }
}

export default Home;