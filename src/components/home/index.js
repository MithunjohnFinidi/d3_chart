import React from 'react';
import {Component} from 'react';
import WorldMap from '../worldmap/index';
import Sankey from '../sankey/index';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>home</h1>
                <WorldMap/>
                <Sankey/>
            </div>
        )
        
    }
}

export default Home;