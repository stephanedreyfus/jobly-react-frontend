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
            first_name: "",
            last_name: "",
            email: "",
            photo_url: "",
            needsToRegister: false,
            errors: null,
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.toggleNeedsToRegister = this.toggleNeedsToRegister.bind(this);
    }

    changeHandler(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    async submitRegister(evt) {
        try {
            evt.preventDefault();
            const { username, password, first_name, last_name, email, photo_url } = this.state;
            let res = await JoblyApi.register({ username, password, first_name, last_name, email, photo_url });
            localStorage.setItem('token', res.token);
            this.props.history.push('/companies/');
        } catch(error) {
            this.setState({
                errors: error
            });
        }
    }

    showRegisterForm() {
        return (
            <form onSubmit={this.submitRegister}>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" onChange={this.changeHandler}/><br/>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" onChange={this.changeHandler}/><br/>
                <label htmlFor="first_name">First Name: </label>
                <input id="first_name" name="first_name" onChange={this.changeHandler}/><br/>
                <label htmlFor="last_name">Last Name: </label>
                <input id="last_name" name="last_name" onChange={this.changeHandler}/><br/>
                <label htmlFor="email">Email: </label>
                <input id="email" name="email" onChange={this.changeHandler}/><br/>
                <label htmlFor="photo_url">Photo Url: </label>
                <input id="photo_url" name="photo_url" onChange={this.changeHandler}/><br/>
                <button>Register</button>
            </form>
        );
    }

    async submitLogin(evt) {
        try {
            evt.preventDefault();
            const { username, password} = this.state;
            let res = await JoblyApi.login({ username, password});
            localStorage.setItem('token', res.token);
            this.props.history.push('/companies/');
        } catch(error) {
            this.setState({
                errors: error
            })
        }
    }

    showLoginForm() {
        return (
            <form onSubmit={this.submitLogin}>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" onChange={this.changeHandler}/><br/>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" onChange={this.changeHandler}/><br/> 
                <button>Login</button>
            </form>
        );
    }

    async toggleNeedsToRegister() {
        this.setState(st => ({ needsToRegister: !st.needsToRegister,
                               errors: null}))
    }
    
    render () {
        console.log(this.state, 'this.state')
        return (
            <div>
                <button onClick={this.toggleNeedsToRegister} disabled={ !this.state.needsToRegister }>Login</button>
                <button onClick={this.toggleNeedsToRegister} disabled={ this.state.needsToRegister }>Sign Up</button>
                { this.state.needsToRegister ? this.showRegisterForm() : this.showLoginForm() }
                { this.state.errors ? <Alert errorList={this.state.errors}/> : null }
            </div>
        );
    }
}

export default Login;