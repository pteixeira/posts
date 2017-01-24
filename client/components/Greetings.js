import React, { Component } from 'react';
import axios from 'axios';

class Greetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    }
  }

  isLoggedIn() {
    // axios.get('/malho')
    // .then(res => {
    //   this.setState({ currentUser: res.data.name})
    // })
    // axios.get('http://localhost:3000/api/auth/reddit')
    //   .then(res => {})
    //   .catch(err => console.log(err))
    axios.get('/api/events')
    .then(res => console.log(res))
  }

  render() {
    return (
      <div className="jumbotron">
        <a href="/api/auth/reddit">Çup</a>
        <h1 onClick={this.isLoggedIn.bind(this)}>Hello {this.state.currentUser}</h1>
      </div>
    );
  }
}

export default Greetings;
