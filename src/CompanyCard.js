import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css'
import image from './company_icon.png'

/** component shows details about a company */
class CompanyCard extends Component {
    render () {
        return (
            <div className="company-card">
                <Link to={`/companies/${this.props.handle}`}>
                    <div>
                        <p>{ this.props.name }</p>
                        <p>{ this.props.description }</p>
                        <img src={ this.props.img_url || image } alt='logo' />
                    </div>
                </Link>
            </div>
        )
    }
}

export default CompanyCard;