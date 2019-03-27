import React, { Component } from 'react';
import Search from './Search';

/** component that renders a list of companies as CompanyCard components*/
class Companies extends Component {

    
    render () {
        return (
            <div>
                <h1>Companies Page</h1>
                <Search />
            </div>
        )
    }
}

export default Companies;