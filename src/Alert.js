import React, { Component } from 'react';

class Alert extends Component {

    render () {
        return (
            <div>
                {this.props.errorList.map( e => <p key={e}>{e}</p>)}
            </div>
        )
    }
}

export default Alert;