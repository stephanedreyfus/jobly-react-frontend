import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/** component shows details about a company */
class CompanyCard extends Component {
    render () {
        return (
            <Link to={`/companies/${this.props.handle}`}>
            <div>
                <p>{ this.props.name }</p>
                <p>{ this.props.description }</p>
                <img src={ this.props.img_url } alt='logo' />
            </div>
            </Link>
        )
    }
}

export default CompanyCard;