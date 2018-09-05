import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Loading from '../../components/Loading';
import PlaylistSelectorView from '../../components/PlaylistSelectorView';
import PlaylistView from '../../components/PlaylistView';
import SideNavbar from '../../components/SideNavbar';
import MainContainer from '../MainContainer';
import PlayerContainer from '../PlayerContainer';

import * as actions from '../../actions';
import store from '../../store';

import config from '../../config';

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
    store.dispatch(actions.fetchToken()).then(() => {
      this.setState(() => ({ tokenLoaded: true }));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.tokenInterval);
  }

  handleResize = (e: any) => {
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
                <Route
                  path="/playlists/:id"
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
