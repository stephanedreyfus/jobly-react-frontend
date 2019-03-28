import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import Alert from './Alert';

/** renders a form to login/register, shows alert if there are errors */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            photo_url: undefined,
            needsToRegister: false,
            errors: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.toggleNeedsToRegister = this.toggleNeedsToRegister.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    filterFields(fields){

        const fieldsToSend = {};

        for (let key in fields){
            if (fields[key] && fields[key].length > 0) {
                fieldsToSend[key] = fields[key];
            } else {
                fieldsToSend[key] = undefined;
            }
        }
        return fieldsToSend;
    }

    async submitRegister(evt) {
        try {
            evt.preventDefault();
            const {username, password, first_name, last_name, email, photo_url} = this.state;
            const fieldsToSend = this.filterFields({username, password, first_name, last_name, email, photo_url});
            let res = await JoblyApi.register(fieldsToSend);
            localStorage.setItem('token', res.token);
            await this.props.login();
            this.props.history.push('/companies/');
        } catch (error) {
            this.setState({
                errors: error
            });
        }
    }
    
    showRegisterForm() {
        return (
            <form onSubmit={this.submitRegister}>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" onChange={this.handleChange} /><br />
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" onChange={this.handleChange} /><br />
                <label htmlFor="first_name">First Name: </label>
                <input id="first_name" name="first_name" onChange={this.handleChange} /><br />
                <label htmlFor="last_name">Last Name: </label>
                <input id="last_name" name="last_name" onChange={this.handleChange} /><br />
                <label htmlFor="email">Email: </label>
                <input id="email" name="email" onChange={this.handleChange} /><br />
                <label htmlFor="photo_url">Photo Url: </label>
                <input id="photo_url" name="photo_url" onChange={this.handleChange} /><br />
                <button>Register</button>
            </form>
        );
    }

    async submitLogin(evt) {
        try {
            evt.preventDefault();
            const { username, password } = this.state;
            let res = await JoblyApi.login({ username, password });
            localStorage.setItem('token', res.token);
            await this.props.login();
            this.props.history.push('/companies/');
        } catch (error) {
            this.setState({
                errors: error
            });
        }
    }

    showLoginForm() {
        return (
            <form onSubmit={this.submitLogin}>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" onChange={this.handleChange} /><br />
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" onChange={this.handleChange} /><br />
                <button>Login</button>
            </form>
        );
    }

    async toggleNeedsToRegister() {
        this.setState(st => ({
            needsToRegister: !st.needsToRegister,
            errors: []
        }));
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleNeedsToRegister}
                disabled={!this.state.needsToRegister}>Login</button>
                <button onClick={this.toggleNeedsToRegister}
                disabled={this.state.needsToRegister}>Sign Up</button>
                {this.state.needsToRegister ? this.showRegisterForm() : this.showLoginForm()}
                {this.state.errors.length > 1 ? <Alert errorList={this.state.errors} /> : null}
            </div>
        );
    }
}

export default Login;