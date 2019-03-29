import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Profile from './Profile';

/** component that renders pages by route */
class Routes extends Component {

    /** Renders routes to display for clients who are logged in. */
    isLoggedIn() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home currentUser={this.props.currentUser}/>} />
                <Route exact path="/companies"
                       render={() => <Companies />} />
                <Route exact path="/companies/:handle" 
                       render={rtProps => <Company handle={rtProps.match.params.handle} 
                       currentUser={this.props.currentUser}
                       updateUserJobs={this.props.updateUserJobs} />} />
                <Route exact path="/jobs"
                       render={() => <Jobs updateUserJobs={this.props.updateUserJobs}
                       currentUser={this.props.currentUser} />} />
                <Route exact path="/profile" render={() => <Profile currentUser={this.props.currentUser} updateUser={this.props.updateUser}/>} />
                <Redirect to="/" />
            </Switch>
        );
    }
    
    /** Renders routes to display for clients who are not logged in. */
    isLoggedOut() {
        return (
        <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/login"
                   render={rtProps => <Login login={this.props.login}
                                             history={rtProps.history}/>} />
            <Redirect to="/login" />
        </Switch>
        );
    }
    
    render () {
        return (
           <div>
               { this.props.currentUser ? this.isLoggedIn() : this.isLoggedOut() }
           </div>
        );
    }
}

export default Routes;

