import React, { Component } from 'react';
import Search from './Search';
import JoblyApi from './JoblyApi';

/** component that renders a list of companies as CompanyCard components*/
class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
    }

    async componentDidMount() {
        let result = JoblyApi.getAllCompanies();
        let companies = result.companies;
        this.setState({ companies });
    }

    render() {
        return (
            <div>
                <h1>Companies Page</h1>
                <Search sendSearch={}/>
            </div>
        )
    }
}

export default Companies;