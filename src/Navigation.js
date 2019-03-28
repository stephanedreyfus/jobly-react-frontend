import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

/** class for navigation bar */
class Navigation extends Component {

    showLoggedInNav() {
        return (
            <nav>
                <NavLink exact to='/'>Jobly</NavLink>
                <NavLink exact to='/companies' >Companies</NavLink>
                <NavLink exact to='/jobs' >Jobs</NavLink>
                <NavLink exact to='/profile' >Profile</NavLink>
                <NavLink exact to='/' ><p onClick={this.props.logout}>Logout</p></NavLink>
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
                {this.props.currentUser ? this.showLoggedInNav() : this.showLoggedOutNav()}
            </div>
        )
    }
}

export default Navigation;