import React, { Component } from 'react';

class Reactify extends Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(window.location.search);
    this.state = {
        token : params.get('access_token'),
        invalid_token : params.get('invalid_token')
    };
  }

  render() {
    return (
      <div>
      <h2>Reactify Page</h2>
        {(this.state.token !== null)
            ? `You're authenticated, your acces token is ${this.state.token}`
            : `There's a problem with your authentication.
            \nRun Reactify-Server first, then go to http://localhost:8888/`}
        {(this.state.invalid_token !== null) &&
            'Invalid token'
        }
      </div>
    );
  }
}

export default Reactify;
