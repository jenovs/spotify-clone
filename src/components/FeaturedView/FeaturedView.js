import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../CoverArt';
import Loading from '../Loading';
import { Header, Wrapper } from './styled';

import { gridTemplateColumns, rootUrl } from '../../variables';

class FeaturedView extends Component {
  handleClick = (href, playClicked) => {
    const {
      activePlaylistHref,
      history,
      isPaused,
      isPlaying,
      setPause,
      startPlaylist,
      unpause,
    } = this.props;

    if (playClicked) {
      if (isPlaying && href === activePlaylistHref) {
        return isPaused ? unpause() : setPause();
      } else {
        return startPlaylist({ href });
      }
    }

    if (history) {
      return history.push(`/${href.replace(rootUrl + '/', '')}`);
    }
  };

  render() {
    const {
      featured,
      activePlaylistHref,
      isPaused,
      isPlaying,
      windowWidth,
    } = this.props;

    if (!featured) return <Loading />;

    return (
      <React.Fragment>
        <Header>{featured.message}</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {featured.playlists.items.map(item => {
            if (!item.images.length) return null;
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

const mapStateToProps = state => ({
  activePlaylistHref: state.playlist.href,
  featured: state.featured,
  isPaused: state.isPaused,
  isPlaying: state.isPlaying,
});

const mapDispatchToProps = dispatch => ({
  startPlaylist: ({ href }) => {
    dispatch(actions.startPlaylist({ href }));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
  unpause: () => {
    dispatch(actions.unpause());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedView);
