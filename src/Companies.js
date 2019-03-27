import React, { Component } from 'react';
import Search from './Search';

/** component that renders a list of companies as CompanyCard components*/
class Companies extends Component {
    
    render () {
        return (
            <div>
                <Search />
                <h1>Companies Page</h1>
            </div>
        )
    }
}

export default Companies;