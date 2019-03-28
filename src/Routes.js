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


    // ifLoggedin() {
    //     return (
    //         <Switch>
    //             <Route exact path="/" render={() => <Home />} />
    //             <Route exact path="/companies" render={() => <Companies />} />
    //             <Route exact path="/companies/:handle" 
    //                    render={rtProps => <Company handle={rtProps.match.params.handle} />} />
    //             <Route exact path="/jobs" render={() => <Jobs />} />
    //             <Route exact path="/login" render={() => <Login />} />
    //             <Route exact path="/profile" render={() => <Profile />} />
    //             <Redirect to="/" />
    //         </Switch>
    //     );
    // }

    // ifLoggedOut() {
    //     return (
    //     <Switch>
    //         <Route exact path="/" render={() => <Home />} />
    //         <Route exact path="/login" render={() => <Login />} />
    //         <Redirect to="login" />
    //     </Switch>
    //     );
    // }
    
    render () {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/companies" render={() => <Companies />} />
                <Route exact path="/companies/:handle" 
                       render={rtProps => <Company handle={rtProps.match.params.handle} />} />
                <Route exact path="/jobs" render={() => <Jobs />} />
                <Route exact path="/login" render={rtProps => <Login history={rtProps.history} />} />
                <Route exact path="/profile" render={() => <Profile />} />
                <Redirect to="/" />
            </Switch>
        );
    }
}

export default Routes;

