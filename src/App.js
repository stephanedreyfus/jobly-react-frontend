import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation';
import Routes from './Routes'; 
import jwt from 'jsonwebtoken';
import JoblyApi from './JoblyApi';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }

  /** rehydrate App with currentUser */
  async componentDidMount() {
    if ("token" in localStorage) {
      const token = localStorage.getItem("token")
      const payload = jwt.decode(token);

      const currentUser = JoblyApi.getCurrentUser(payload.username).user;
      currentUser.is_admin = payload.is_admin;

      this.setState({
        currentUser
      })
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation currentUser={this.state.currentUser}/>
          <Routes currentUser={this.state.currentUser}/> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
