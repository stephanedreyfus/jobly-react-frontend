import React, { Component } from 'react';

/** search bar component to filter through lists of jobs or companies */
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.sendSearch(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input onChange={this.handleChange}
                    placeholder="enter search term"
                    name="search"
                    id="search" />
                <button>Search</button>
            </form>
        );
    }
}

export default Search;