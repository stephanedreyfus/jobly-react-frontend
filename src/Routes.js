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


    isLoggedIn() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home currentUser={this.props.currentUser}/>} />
                <Route exact path="/companies" render={() => <Companies />} />
                <Route exact path="/companies/:handle" 
                       render={rtProps => <Company handle={rtProps.match.params.handle} />} />
                <Route exact path="/jobs" render={() => <Jobs />} />
                <Route exact path="/profile" render={() => <Profile />} />
                <Redirect to="/" />
            </Switch>
        );
    }

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

