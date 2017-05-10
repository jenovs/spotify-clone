import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
// import history from '../history';

import Main from '../Main';
import SideNavbar from '../SideNavbar';
import Playlist from '../Playlist';

import './App.css';


class App extends Component {
  componentWillReciveProps(nextProps) {
    console.log('componentWillReciveProps', nextProps);
  }

  render() {
    return (
      // <Router history={history}>
      <Router>
        <div className="App">
          <div className="container">
            <SideNavbar />
            <section>
              <Switch>
                <Redirect exact from="/" to="/browse/featured" />
                <Redirect exact from="/browse" to="/browse/featured" />
                <Route path="/playlist" component={Playlist} />
                <Route path="/browse" component={Main} />
                <Route path="/browse/featured" component={Main} />
              </Switch>
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
