import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../CoverArt';
import Loading from '../Loading';
import { Header, Wrapper } from './styled';

import { gridTemplateColumns, rootUrl } from '../../variables';

class CategoryView extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryPlaylist(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearCategoryPlaylist();
  }

  handleClick = (href, playClicked) => {
    const {
      activePlaylistHref,
      history,
      isPaused,
      isPlaying,
      startPlaylist,
      setPause,
      unpause,
    } = this.props;

    if (playClicked) {
      if (isPlaying && href === activePlaylistHref) {
        return isPaused ? unpause() : setPause();
      } else {
        return startPlaylist(href);
      }
    }

    if (history) {
      return history.push(`/${href.replace(rootUrl + '/', '')}`);
    }
  };

  render() {
    const { activePlaylistHref, isPaused, isPlaying, windowWidth } = this.props;
    if (!this.props.playlist) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Header>Popular Playlists</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {this.props.playlist.map(p => {
            const icon = p.images[0].url;
            return (
              <CoverArt
                key={p.id}
                {...p}
                icon={icon}
                href={p.href}
                handleClick={this.handleClick}
                showPlayBtn={
                  activePlaylistHref === p.href && isPlaying && !isPaused
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
  isPaused: state.isPaused,
  isPlaying: state.isPlaying,
  playlist: state.categoryPlaylist,
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchCategoryPlaylist: id => {
    dispatch(actions.fetchCategoryPlaylist(id));
  },
  clearCategoryPlaylist: () => {
    dispatch(actions.clearCategoryPlaylist());
  },
  startPlaylist: href => {
    dispatch(actions.startPlaylist({ href }));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
  unpause: () => {
    dispatch(actions.unpause());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
