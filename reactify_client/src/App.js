import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Reactify from './components/Reactify';

import './App.css';
import './css/Reactify.css';

class App extends Component {

  render() {
    return (
      <Router className="App">
          <div>
              <Route exact path="/" component={Home}/>
              <Route path="/reactify" component={Reactify}/>
          </div>
      </Router>
    );
  }
}

export default App;
