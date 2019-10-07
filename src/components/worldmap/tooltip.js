import React from 'react';
import {Component} from 'react';

class Tooltip extends Component {

    constructor() {
        super();
        this.state = {
            styles: {
                left: '0px',
                top: '0px'
            }
        }
    }

    componentDidMount() {
        const { xScale, yScale } = this.props.scales;
        this.setState({
            styles: {
                left: `${this.props.scales.xScale}px`,
                top: `${this.props.scales.yScale}px`
            }
        })
        const styles = {
            left: `${this.props.scales.xScale}px`,
            top: `${this.props.scales.yScale}px`
        }
    }
    

    render() {
        debugger
        return (
            <div className="Tooltip" style={this.state.styles}>
      asdadasdas
    </div>
        )
    }
}

export default Tooltip;
