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
import PlaylistContainer from '../PlaylistContainer';
import SideNavbar from '../../components/SideNavbar';

import store from '../../store';
import * as actions from '../../actions';

import { Background, Section, Wrapper } from './styled';

class App extends Component {
  state = {
    tokenLoaded: false,
  };

  // Update the token once an hour
  tokenInterval = setInterval(() => {
    store.dispatch(actions.fetchToken());
  }, 3500 * 1000);

  componentDidMount() {
    // Get a token and fetch a list of featured playlists
    store.dispatch(actions.fetchToken()).then(() => {
      const token = store.getState().token;
      this.setState(() => ({ tokenLoaded: true }));
      store.dispatch(actions.fetchFeatured(token));
    });
  }

  componentWillUnmount() {
    clearInterval(this.tokenInterval);
  }

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
                <Route path="/playlist" component={PlaylistContainer} />
                <Route
                  path="/browse/featured"
                  render={routeProps => <MainContainer {...routeProps} />}
                />
                <Route path="/browse" component={MainContainer} />
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
