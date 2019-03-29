import React, { Component } from 'react';
import Search from './Search';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

/** component that renders a list of jobs as JobCard components */
class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            loading: true,
            error: false
        }
        this.getJobsBySearch = this.getJobsBySearch.bind(this);
        this.updateJobsList = this.updateJobsList.bind(this);
    }

    async componentDidMount() {
        try {
            let jobs = await JoblyApi.getAllJobs();
            this.setState({
                jobs,
                loading: false,
                error: false
            });
        } catch {
            this.setState({
                error: true,
                loading: false
            });
        }
    }

    updateJobsList(id) {
        const jIndex = this.state.jobs.findIndex( j => j.id === id );
        this.setState( st => ({
            jobs: [...st.jobs.slice(0, jIndex), 
                   st.jobs[jIndex] = {...st.jobs[jIndex], 
                   state: "applied"}, ...st.jobs.slice(jIndex+1)]
        }));
    }

    // async componentDidUpdate() {
    //     try {
    //         let jobs = await JoblyApi.getAllJobs();
    //         this.setState({
    //             jobs,
    //             loading: false,
    //             error: false
    //         });
    //     } catch {
    //         this.setState({
    //             error: true,
    //             loading: false
    //         });
    //     }
    // }

    async getJobsBySearch(search) {
        try {
            let jobs = await JoblyApi.getAllJobs(search);
            this.setState({
                jobs,
                loading: false,
                error: false
            });
        } catch {
            this.setState({
                error: true,
                loading: false
            });
        }
    }
    showLoading() {
        return <h1>One moment please...</h1>
    }

    showError(searchBar) {
        return (
            <div>
                {searchBar}
                <h1>Something went wrong. Please try again later.</h1>
            </div>
        );
    }

    showNoJobs(searchBar) {
        return (
            <div>
                {searchBar}
                <h1>Sorry, no jobs match this search.</h1>
            </div>
        );
    }

    render() {
        let { loading, error, jobs } = this.state;
        const searchBar = <Search sendSearch={this.getJobsBySearch} />
        if (loading) return this.showLoading();
        else if (error) return this.showError(searchBar);
        else if (jobs.length === 0) return this.showNoJobs(searchBar);
        else {
            return (
                <div>
                    {searchBar}
                    {jobs.map(j => <JobCard
                        key={j.id}
                        {...j}
                        updateUserJobs={this.props.updateUserJobs}
                        updateJobsList={this.updateJobsList} />)}
                </div>
            );
        }
    }
}

export default Jobs;