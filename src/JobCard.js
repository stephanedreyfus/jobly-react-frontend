import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import './JobCard.css';

/** component shows details about a company */
class JobCard extends Component {

    showApplyButton() {
        return (
            <button className="apply-button"
            onClick={() => this.handleUpdateUserJobs}>Apply</button>
        );
    }

    showDisabledButton() {
        return (
            <button className="apply-button"
                disabled={true}>Applied</button>
        );
    }

    // Need to replace "testuse" with currentUser username.
    /**  */
    async handleUpdateUserJobs() {
        let {id, company_handle, title, state} = this.props
        let job = {id, company_handle, title, state};
        console.log(this.props);
        this.props.updateUserJobs(job);
        let res = await JoblyApi.applyToJob("testuser", job.id);
        console.log("Job apply result", res);
        return res;
    }

    render() {
        return (
            <div className="job-card">
                <h3>{this.props.title}</h3>
                <p>Salary: {this.props.salary}</p>
                <p>Equity: {this.props.equity}</p>
                {(this.props.state === null) ? this.showApplyButton() : this.showDisabledButton()}
            </div>
        );
    }
}

export default JobCard;
