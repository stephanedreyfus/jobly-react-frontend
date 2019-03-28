import React, { Component } from 'react';

/** component shows details about a company */
class JobCard extends Component {
    render () {
        return (
            <div>
                <h3>{ this.props.title }</h3>
                <p>Salary: { this.props.salary }</p>
                <p>Equity: { this.props.equity }</p>
                <p>button should be here: { this.props.status }</p>
            </div>
        )
    }
}

export default JobCard;