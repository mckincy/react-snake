import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Snake from './components/Snake.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={`./${logo}`} className="App-logo" alt="logo" />
          <h1 className="App-title">React snake game</h1>
          <p> ↑ → ↓ ← </p>
        </header>
        <Snake/>
      </div>
    );
  }
}

export default App;
