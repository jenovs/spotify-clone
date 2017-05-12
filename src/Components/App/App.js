import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Main from '../Main';
import SideNavbar from '../SideNavbar';
import Playlist from '../Playlist';

import store from '../../store';

import { getToken } from '../../helpers';

import './App.css';

class App extends Component {

  componentDidMount() {
    // const token = JSON.parse(localStorage.getItem('token'))
    if (!localStorage.getItem('token')) getToken();

    this.state = {
      playing: false,
      playlist: null,
    }

    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(pl) {
    console.log('handlePlaylist', pl);
  }

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
                {/* <Route path="/browse/featured" component={Main} handlePlay={this.handlePlay} /> */}
                <Route
                  path="/browse/featured"
                  render={routeProps => <Main {...routeProps} handlePlay={this.handlePlay}/>}
                />
                <Route path="/browse" component={Main} />
              </Switch>
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
