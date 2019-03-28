import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation';
import Routes from './Routes'; 

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Routes /> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
