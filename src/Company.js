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
                                equity={j.equity} />
                            )}
                        </div>
                }
            </div>
        )
    }
}

export default Company;