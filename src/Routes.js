import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Profile from './Profile';

/** component that renders pages by route */
class Routes extends Component {
    
    render () {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/companies" render={() => <Companies />} />
                <Route exact path="/companies/:handle" render={() => <Company />} />
                <Route exact path="/jobs" render={() => <Jobs />} />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/profile" render={() => <Profile />} />
            </Switch>
        )
    }
}

export default Routes;

