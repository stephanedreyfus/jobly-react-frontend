import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import './JobCard.css';

/** component shows details about a company */
class JobCard extends Component {

    showApplyButton() {
        return (
            <button className="apply-button"
            onClick={() => this.handleUpdateUserJobs()}>Apply</button>
        );
    }

    showDisabledButton() {
        return (
            <button className="apply-button"
                disabled={true}>Applied</button>
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.state !== nextProps.state;
    }

    // Need to replace "testuse" with currentUser username.
    /**  */
    async handleUpdateUserJobs() {
        let {id, company_handle, title} = this.props
        let job = {id, company_handle, title, state:"applied"};
        let res = await JoblyApi.applyToJob(job.id);
        this.props.updateUserJobs(job);
        this.props.updateJobsList(id);
        return res;
    }

    render() {
        console.log(this.props)
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
