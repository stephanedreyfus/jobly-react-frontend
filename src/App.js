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
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateUserJobs = this.updateUserJobs.bind(this);
  }

  /** rehydrate App with currentUser */
  async componentDidMount() {
    if ("token" in localStorage) {
      await this.login();
    }
  }

  async login() {
    const token = localStorage.getItem("token")
      const payload = jwt.decode(token);

      const currentUser = await JoblyApi.getCurrentUser(payload.username);
      currentUser.is_admin = payload.is_admin;

      this.setState({
        currentUser: {...currentUser, jobs: new Set(currentUser.jobs.map(j => j.id))}
      });
  }

  logout() {
    localStorage.removeItem("token");
    this.setState({ currentUser: null });
  }

  updateUser(user) {
    this.setState( st => ({ currentUser: { ...st.currentUser, ...user } }))
  }

  updateUserJobs(id) {
    this.setState( st =>
      ({ currentUser: {...st.currentUser,
                      jobs: st.currentUser.jobs.add(id) } })
    );
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation currentUser={this.state.currentUser} logout={this.logout} />
          <Routes currentUser={this.state.currentUser}
                  login={this.login}
                  updateUser={this.updateUser}
                  updateUserJobs={this.updateUserJobs} /> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
