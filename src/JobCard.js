import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import './JobCard.css';

/** component shows details about a company */
class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false}
    }

    showApplyButton() {
        return (
            <button className="apply-button"
            onClick={() => this.handleUpdateUserJobs()}>Apply</button>
        );
    }

    showDisabledButton() {
        return (
            <button className="apply-button disabled"
                disabled={true}>Applied</button>
        );
    }

    /** If parent list re-renders only re-renders card if
     * this card changed. */
    shouldComponentUpdate(nextProps) {
        return this.props.state !== nextProps.state;
    }


    /** Adds job to applications table and sets state of job to
     * "applied". If called through Jobs forces a render of the
     * jobs page to update change in button. */
    async handleUpdateUserJobs() {
        try {
            let res = await JoblyApi.applyToJob(this.props.id);
            this.props.updateUserJobs(this.props.id);
            // if (this.props.updateJobsList) this.props.updateJobsList(id);
            return res;
        } catch(err) {
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <div className="job-card">
                <h3>{this.props.title}</h3>
                <p>Salary: {this.props.salary}</p>
                <p>Equity: {this.props.equity}</p>
                {(this.props.state === null) ? this.showApplyButton() : this.showDisabledButton()}
                {(this.state.error === true) ?
                    <p>Something went wrong. Please try again later.</p> :
                    null}
            </div>
        );
    }
}

export default JobCard;
