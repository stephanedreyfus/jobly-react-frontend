import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

/** class for navigation bar */
class Navigation extends Component {

    render() {

        return (
            <nav>
                <NavLink exact to='/'>Jobly</NavLink>
                <NavLink exact to='/companies' >Companies</NavLink>
                <NavLink exact to='/jobs' >Jobs</NavLink>
                <NavLink exact to='/profile' >Profile</NavLink>
                <NavLink exact to='/login' >Login</NavLink>
            </nav>
        )
    }
}

export default Navigation;