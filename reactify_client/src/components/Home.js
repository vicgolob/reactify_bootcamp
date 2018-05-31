import React, { Component } from 'react';

import Reactify from './Reactify';

class App extends Component {
  constructor(props) {
    super(props);
    this.loginAction = this.loginAction.bind(this);
    this.state = {
        token : null
    }
  }

  loginAction() {
      return fetch('http://localhost:8888/').then(response => {
          response.text().then(token => {
              this.setState({
                  token: token
              });
          });
          this.props.history.push("/reactify")
      }).catch(e => {alert(`${e} - Server is not running`)});
  }

  componentDidMount() {
      this.loginAction();
  }

  render() {
    return (
      <div>
          <h2>Home Page</h2>
          <p>You're not Authenticated.
          <br></br>
          Make sure you run Reactify-Server first and then click button below.
          </p>

          <Reactify token={this.state.token}/>
      </div>
    );
  }
}

export default App;
