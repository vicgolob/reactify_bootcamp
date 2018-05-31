import React, { Component } from 'react';
import './App.css';

import HashParams from './helpers/HashParams';

class App extends Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(window.location.search);
    this.state = {
        token : params.get('access_token')
    };
  }

  render() {
    return (
      <div className="App">
        {(this.state.token !== null)
            ? `You're authenticated, your acces token is ${this.state.token}`
            : `There's a problem with your authentication.
            \nRun Reactify-Server first, then go to http://localhost:8888/`}
      </div>
    );
  }
}

export default App;
