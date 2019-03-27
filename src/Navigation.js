import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

/** class for navigation bar */
class Navigation extends Component {

    render() {
        const activeStyle = {
            fontWeight: 'bold',
            color: 'blue'
        };

        return (
            <nav>
                <NavLink exact to='/'>Jobly</NavLink>
                <NavLink exact to='/companies' activeStyle={activeStyle} >Companies</NavLink>
                <NavLink exact to='/jobs' activeStyle={activeStyle} >Jobs</NavLink>
                <NavLink exact to='/profile' activeStyle={activeStyle} >Profile</NavLink>
                <NavLink exact to='/login' activeStyle={activeStyle} >Login</NavLink>
            </nav>
        )
    }
}

export default Navigation;