import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../CoverArt';
import Loading from '../Loading';
import { Header, Wrapper } from './styled';

import { gridTemplateColumns, rootUrl } from '../../variables';

class PlaylistSelectorView extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!this.props.selection) {
      return this.props.config.onMount(id);
    }
  }

  componentWillUnmount() {
    const { onUnmount } = this.props.config;
    if (onUnmount) {
      onUnmount();
    }
  }

  handleClick = (href, playClicked) => {
    const {
      activePlaylistHref,
      history,
      isPaused,
      isPlaying,
      setPause,
      unpause,
    } = this.props;

    if (playClicked) {
      if (isPlaying && href === activePlaylistHref) {
        return isPaused ? unpause() : setPause();
      } else {
        return this.props.config.initPlay(href);
      }
    }

    if (history) {
      return history.push(`/${href.replace(rootUrl + '/', '')}`);
    }
  };

  render() {
    const {
      selection,
      activePlaylistHref,
      isPaused,
      isPlaying,
      message,
      windowWidth,
    } = this.props;

    if (!selection) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Header>{message}</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {selection.map(item => {
            if (!item.images.length) {
              return null;
            }
            return (
              <CoverArt
                key={item.id}
                handleClick={this.handleClick}
                href={item.href}
                icon={item.images[0].url}
                id={item.id}
                name={item.name}
                showPlayBtn={
                  activePlaylistHref === item.href && isPlaying && !isPaused
                }
              />
            );
          })}
        </Wrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  activePlaylistHref: state.playlist.href,
  isPaused: state.isPaused,
  isPlaying: state.isPlaying,
  message: state.sectionMessage || props.config.sectionMessage,
  selection: state[props.config.selection],
});

const mapDispatchToProps = dispatch => ({
  setPause: () => {
    dispatch(actions.setPause());
  },
  unpause: () => {
    dispatch(actions.unpause());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistSelectorView);
