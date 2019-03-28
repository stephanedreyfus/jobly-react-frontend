import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

/** class for navigation bar */
class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: "token" in localStorage
        }
    }

    showLoggedInNav() {
        return (
            <nav>
                <NavLink exact to='/'>Jobly</NavLink>
                <NavLink exact to='/companies' >Companies</NavLink>
                <NavLink exact to='/jobs' >Jobs</NavLink>
                <NavLink exact to='/profile' >Profile</NavLink>
                <NavLink exact to='/'>Logout</NavLink>
            </nav>
        )
    }

    showLoggedOutNav() {
        return (
            <nav>
                <NavLink exact to='/'>Jobly</NavLink>
                <NavLink exact to='/login' >Login</NavLink>
            </nav>
        )
    }

    render() {

        return (
            <div>
                {this.state.loggedIn ? this.showLoggedInNav() : this.showLoggedOutNav()}
            </div>
        )
    }
}

export default Navigation;