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
            debugger
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

    render() {
        let errorMsg = <h1>Something went wrong. Please try again later.</h1>
        let loadMsg = <h1>One moment please...</h1>
        let noCompaniesMsg = <h1>Sorry, no companies match this search.</h1>
        let { loading, error, companies } = this.state;
        console.log('companies', companies)
        return (
            <div>
                {loading ? loadMsg :
                    error ? errorMsg :
                        companies.length === 0 ? noCompaniesMsg :
                        <>
                            <Search sendSearch={this.getCompanyBySearch} />
                            { companies.map(c => <CompanyCard
                                key={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logo_url} />)}
                        </>
                }
            </div>
        );
    }
}

export default Companies;