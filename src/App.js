import React from 'react';
import {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from './components/nav/index';
import Home from './components/home/index';
import Details from './components/details/index';

class App extends Component {
  render () {
    return (
        <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/home" component={Home}/>
              <Route path="/details" component={Details}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
