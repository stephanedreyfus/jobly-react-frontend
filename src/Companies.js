import React, { Component } from 'react';
import Search from './Search';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';

/** component that renders a list of companies as CompanyCard components*/
class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            loading: true,
            error: false
        }
        this.getCompanyBySearch = this.getCompanyBySearch.bind(this);
    }

    /** gets array of companies after mounting to display */
    async componentDidMount() {
        try {
            let companies = await JoblyApi.getAllCompanies();
            this.setState({
                companies,
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

    /** gets array of companies that matches search term */
    async getCompanyBySearch(search) {
        try {
            let companies = await JoblyApi.getAllCompanies(search);
            this.setState({
                companies,
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

    showNoCompanies(searchBar) {
        return (
            <div>
                {searchBar}
                <h1>Sorry, no companies match this search.</h1>
            </div>
        );
    }

    render() {
        let { loading, error, companies } = this.state;
        const searchBar = <Search sendSearch={this.getCompanyBySearch} />
        if (loading) return this.showLoading();
        else if (error) return this.showError(searchBar);
        else if (companies.length === 0) return this.showNoCompanies(searchBar);
        else {
            return (
                <div>
                    {searchBar}
                    { companies.map(c => <CompanyCard
                        key={c.handle}
                        {...c} />)}
                </div>
            );
        }
    }
}

export default Companies;