import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from '../Main';
import PlayerContainer from '../../containers/PlayerContainer';
import Playlist from '../Playlist';
import SideNavbar from '../SideNavbar';

import store from '../../store';
import * as actions from '../../actions';

import './App.css';

class App extends Component {

  handlePlay(pl) {
    console.log('handlePlaylist', pl);
  }

  render() {
    return (
      <Provider store={store}>
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
                  <Route
                    path="/browse/featured"
                    render={routeProps => <Main {...routeProps} handlePlay={this.handlePlay.bind(this)}/>}
                  />
                  <Route path="/browse" component={Main} />
                </Switch>
              </section>
              <PlayerContainer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

// Inital API call
store.dispatch(actions.fetchToken())
.then(() => {
  const token = store.getState().token;
  store.dispatch(actions.fetchFeatured(token));
});

export default App;
