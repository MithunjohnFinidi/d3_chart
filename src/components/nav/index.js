import Nav from 'react-bootstrap/Nav';
import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

class Navbar extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/details">Details</Link>
                </li>
            </ul>
        )
    }
}

export default Navbar;
