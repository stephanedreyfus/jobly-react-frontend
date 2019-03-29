import React, { Component } from 'react';
import JoblyApi from './JoblyApi'
import JobCard from './JobCard'

/** renders a list of jobs associated with a company as JobCard components */
class Company extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: null,
            error: null,
            loading: true
        }
    }

    async componentDidMount() {
        try {
            let company = await JoblyApi.getCompany(this.props.handle);
                this.setState({
                    company,
                    error: null,
                    loading: false
                });
        } catch(error) {
            this.setState({
                error: error[0],
                loading: false
            });
        }
    }

    /** Mpa over jobs to collect ids, check to see if user job ids
     * are in Set of current company job ids. Return proper status
     * of "applied" or null.
     */
    checkJobStatus(id) {
        const jobIds = this.props.currentUser.jobs.map( j => j.id );
        const jobSet = new Set (jobIds);
        return jobSet.has(id) ? "applied" : null;
    }

    render() {

        const loadingMsg = <h1>One second please...</h1>

        return (
            <div>
                {this.state.loading ? loadingMsg :
                    this.state.error ? <p>{this.state.error}</p> :
                        <div>
                            <h1> {this.state.company.name} </h1>
                            <p> {this.state.company.description}</p>
                            {this.state.company.jobs.map(j => <JobCard
                                key={j.id}
                                title={j.title}
                                salary={j.salary}
                                equity={j.equity}
                                id={j.id}
                                state={this.checkJobStatus(j.id)}
                                company_handle={this.props.handle}
                                updateUserJobs={this.props.updateUserJobs} />
                            )}
                        </div>
                }
            </div>
        );
    }
}

export default Company;