import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/** friendly homepage */
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: "token" in localStorage
        }
    }

    showHomepage() {
        return (
            <>
                <h1>Jobly</h1>
                <p>All the jobs in one convenient place</p>
                { this.state.loggedIn ? <h1>Welcome back!</h1> : <Link to="/login">Login</Link> }
            </>
        )
    }
    
    render () {
        return (
            <div>
                {this.state.loading ? <h1>One moment please...</h1> : this.showHomepage() }
            </div>
        )
    }
}

export default Home;
