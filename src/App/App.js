import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Main from '../Main';
import SideNavbar from '../SideNavbar';
import Playlist from '../Playlist';

import './App.css';


class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <div className="App__background"></div>
          <div className="App__container">
            <SideNavbar />
            <section className="App__section">
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
