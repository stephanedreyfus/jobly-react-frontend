import React, { Component } from 'react';
// import './Alert.css';

class Alert extends Component {

    render () {
        return (
            <div className="alert-card">
                {this.props.errorList.map( e => <p key={e}>{e}</p>)}
            </div>
        )
    }
}

export default Alert;