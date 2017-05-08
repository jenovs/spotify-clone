import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    console.log('match', this.props.match);
    return (
      <div className="App">
        <Link to={"/featured"}>
          Featured
        </Link>
      </div>
    );
  }
}

export default App;
