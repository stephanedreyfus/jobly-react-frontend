import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import Alert from './Alert';

/** shows a form that is used to edit profile, shows alert on errors */
class Profile extends Component {
    constructor(props) {
        super(props);
        const { username,
            password,
            first_name,
            last_name,
            email,
            photo_url } = this.props.currentUser;
        this.state = {
            username,
            password,
            first_name,
            last_name,
            email,
            photo_url,
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
    };

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    filterFields(fields) {
        const fieldsToSend = {};

        for (let key in fields) {
            if (fields[key] && fields[key].length > 0) {
                fieldsToSend[key] = fields[key];
            } else {
                fieldsToSend[key] = undefined;
            }
        }
        return fieldsToSend;
    }

    async updateUser(evt) {
        try {
            evt.preventDefault();
            const { username, first_name, last_name, email, photo_url } = this.state;
            const fieldsToSend = this.filterFields({ first_name, last_name, email, photo_url });
            let updatedUser = await JoblyApi.updateUser(username, fieldsToSend);
            console.log('got here')
            await this.props.updateUser(updatedUser);
        } catch (error) {
            this.setState({
                errors: error
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Profile Page</h1>
                <form onSubmit={this.updateUser}>
                    <label htmlFor="username">Username: </label><br />
                    <p>{this.state.username}</p>
                    <label htmlFor="first_name">First Name: </label>
                    <input id="first_name" name="first_name"
                        onChange={this.handleChange} value={this.state.first_name || ""} /><br />
                    <label htmlFor="last_name">Last Name: </label>
                    <input id="last_name" name="last_name"
                        onChange={this.handleChange} value={this.state.last_name || ""} /><br />
                    <label htmlFor="email">Email: </label>
                    <input id="email" name="email"
                        onChange={this.handleChange} value={this.state.email || ""} /><br />
                    <label htmlFor="photo_url">Photo Url: </label>
                    <input id="photo_url" name="photo_url"
                        onChange={this.handleChange}
                        value={this.state.photo_url || ""} /><br />
                    <button>Update</button>
                    {this.state.errors.length > 1 ? <Alert errorList={this.state.errors} /> : null}
                </form>
            </div>
        );
    }
}

export default Profile;