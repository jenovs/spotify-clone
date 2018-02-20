import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Loading from '../../components/Loading';
import MainContainer from '../MainContainer';
import PlayerContainer from '../PlayerContainer';
import PlaylistSelectorView from '../../components/PlaylistSelectorView';
import PlaylistView from '../../components/PlaylistView';
import SideNavbar from '../../components/SideNavbar';

import store from '../../store';
import * as actions from '../../actions';

import config from '../../config';

import { Background, Section, Wrapper } from './styled';

class App extends Component {
  state = {
    tokenLoaded: false,
    windowWidth: window.innerWidth - 220,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    store.dispatch(actions.fetchToken()).then(() => {
      this.setState(() => ({ tokenLoaded: true }));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.tokenInterval);
  }

  // Update the token once an hour
  tokenInterval = setInterval(() => {
    store.dispatch(actions.fetchToken());
  }, 3500 * 1000);

  handleResize = e => {
    const windowWidth = e.target.innerWidth - 220; // magic number 220 is sidebar width
    this.setState(() => ({ windowWidth }));
  };

  render() {
    if (!this.state.tokenLoaded) {
      return <Loading />;
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
                    <PlaylistSelectorView
                      {...routeProps}
                      windowWidth={this.state.windowWidth}
                      config={config.category}
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
