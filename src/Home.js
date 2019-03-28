import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/** friendly homepage */
class Home extends Component {
    
    render () {
        return (
            <div>
            <h1>Jobly</h1>
            <p>All the jobs in one convenient place</p>
            { this.props.currentUser ? <h1>Welcome back!</h1> : <Link to="/login">Login</Link> }
            </div>
        )
    }
}

export default Home;
