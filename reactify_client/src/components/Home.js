import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.loginAction = this.loginAction.bind(this);
  }

  loginAction() {
      return fetch('http://localhost:8888/').then(response => {
          response.text().then(queryParams => {
              this.props.history.push(`/${queryParams}`);
          });
      }).catch(e => {alert(`${e} - Server is not running`)});
  }

  render() {
    return (
      <div>
          <h2>Home Page</h2>
          <p>You're not Authenticated.
          <br></br>
          Make sure you run Reactify-Server first and then click button below.
          </p>
          <button onClick={this.loginAction}>Log In</button>
      </div>
    );
  }
}

export default App;
