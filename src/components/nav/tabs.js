import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

class Tabs extends Component {
    onChange = () => {
        this.props.onChange(this.props.name)
    }

    render() {
        const {isActive, link, content} = this.props;
        return (
            <li className={isActive ? 'tab-active': ''} onClick={this.onChange}>
                <Link to={link}>{content}</Link>
            </li>
        )
    }
}

export default Tabs;