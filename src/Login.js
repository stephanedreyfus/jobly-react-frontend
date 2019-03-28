import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

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
            needsToRegister: false
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    async submitRegister(evt) {
        evt.preventDefault();
        const { username, password, first_name, last_name, email, photo_url } = this.state;
        let res = await JoblyApi.register({ username, password, first_name, last_name, email, photo_url });
        localStorage.setItem('token', res.token);
        this.props.history.push('/companies/');
    }

    showRegisterForm() {
        return (
            <form onSubmit="submitRegister">
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" onChange={this.changeHandler}/>
                <label htmlFor="password">Password: </label>
                <input id="password" name="password" onChange={this.changeHandler}/>
                <label htmlFor="first_name">First Name: </label>
                <input id="first_name" name="first_name" onChange={this.changeHandler}/>
                <label htmlFor="last_name">Last Name: </label>
                <input id="last_name" name="last_name" onChange={this.changeHandler}/>
                <label htmlFor="email">Email: </label>
                <input id="email" name="email" onChange={this.changeHandler}/>
                <label htmlFor="photo_url">Photo Url: </label>
                <input id="photo_url" name="photo_url" onChange={this.changeHandler}/>
            </form>
        );
    }

    submitLogin() {

    }

    showLoginForm() {
        return (
            <form onSubmit="submitLogin">
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" onChange={this.changeHandler}/>
                <label htmlFor="password">Password: </label>
                <input id="password" name="password" onChange={this.changeHandler}/>
            </form>
        );
    }
    
    render () {
        const whatToRender = this.needsToRegister ? this.showRegisterForm() : this.showLoginForm()
        return (
            {whatToRender}
        );
    }
}

export default Login;