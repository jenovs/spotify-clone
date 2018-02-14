import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import MainContainer from '../MainContainer';
import PlayerContainer from '../PlayerContainer';
import PlaylistView from '../../components/PlaylistView';
import SideNavbar from '../../components/SideNavbar';
import CategoryView from '../../components/CategoryView';

import store from '../../store';
import * as actions from '../../actions';

import { Background, Section, Wrapper } from './styled';

class App extends Component {
  state = {
    tokenLoaded: false,
    windowWidth: window.innerWidth - 220,
  };

  // Update the token once an hour
  tokenInterval = setInterval(() => {
    store.dispatch(actions.fetchToken());
  }, 3500 * 1000);

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    // Get a token and fetch a list of featured playlists
    store.dispatch(actions.fetchToken()).then(() => {
      const token = store.getState().token;
      this.setState(() => ({ tokenLoaded: true }));
      store.dispatch(actions.fetchFeatured(token));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.tokenInterval);
  }

  handleResize = e => {
    const windowWidth = e.target.innerWidth - 220; // magic number 220 is sidebar width
    this.setState(() => ({ windowWidth }));
  };

  render() {
    // TODO Add Loading component
    if (!this.state.tokenLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <Provider store={store}>
        <Router>
          <Wrapper>
            <Background />
            <SideNavbar />
            <Section>
              <Switch>
                <Redirect exact from="/" to="/browse/featured" />
                <Redirect exact from="/browse" to="/browse/featured" />
                <Route
                  path="/users/:username/playlists/:id"
                  component={PlaylistView}
                />
                <Route path="/albums/:id" component={PlaylistView} />
                <Route
                  path="/browse/featured"
                  render={routeProps => (
                    <MainContainer
                      {...routeProps}
                      windowWidth={this.state.windowWidth}
                    />
                  )}
                />
                <Route
                  path="/browse"
                  render={routeProps => (
                    <MainContainer
                      {...routeProps}
                      windowWidth={this.state.windowWidth}
                    />
                  )}
                />
                <Route
                  path="/view/:id"
                  render={routeProps => (
                    <CategoryView
                      {...routeProps}
                      windowWidth={this.state.windowWidth}
                    />
                  )}
                />;
              </Switch>
            </Section>
            <PlayerContainer />
          </Wrapper>
        </Router>
      </Provider>
    );
  }
}

export default App;
