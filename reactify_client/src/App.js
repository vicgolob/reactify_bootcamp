import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home';

import './App.css';
import './css/Home.css';

class App extends Component {

  render() {
    return (
      <Router className="App">
          <div>
              <Route path="/" component={Home}/>
          </div>
      </Router>
    );
  }
}

export default App;
