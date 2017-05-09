import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';

import SideNavbar from '../SideNavbar';
import Main from '../Main';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <SideNavbar />
            <section>
              <Redirect from="/" to="/browse/featured" />
              <Redirect from="/browse" to="/browse/featured" />
              <Route path="/browse" component={Main} />
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
