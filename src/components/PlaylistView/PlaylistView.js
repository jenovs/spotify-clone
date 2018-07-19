import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../CoverArt';
import PlaylistPlayButton from '../PlaylistPlayButton';
import TrackContainer from '../../containers/TrackContainer';
import Loading from '../Loading';
import {
  DescriptionWrapper,
  InfoBox,
  Text,
  TracksWrapper,
  Wrapper,
} from './styled';

import { rootUrl } from '../../variables';

class PlaylistView extends Component {
  componentDidMount() {
    this.props.fetchPlaylistView(this.props.currentPlaylistHref);
  }

  componentWillUnmount() {
    this.props.clearPlaylistView();
  }

  handleButton = () => {
    const {
      isPaused,
      isPlaying,
      isActivePlaylist,
      setPause,
      unpause,
      startPlay,
    } = this.props;
    if (isActivePlaylist && isPlaying && !isPaused) {
      return setPause();
    }
    if (isActivePlaylist && isPlaying && isPaused) {
      return unpause();
    }
    if (!isActivePlaylist) {
      return startPlay();
    }
  };

  render() {
    const {
      activePlaylistHref,
      activeTrackId,
      currentPlaylistHref,
      isPaused,
      isPlaying,
      playlist,
      setPause,
      startPlay,
      tracklist,
      isActivePlaylist,
    } = this.props;

    if (!tracklist) {
      return <Loading />;
    }

    return (
      <Wrapper>
        <DescriptionWrapper>
          <CoverArt
            handleClick={this.handleButton}
            icon={playlist.imageUrl}
            id={currentPlaylistHref}
            href={currentPlaylistHref}
            name={playlist.name}
            showPlayBtn={
              activePlaylistHref === currentPlaylistHref &&
              isPlaying &&
              !isPaused
            }
            bigTitle={true}
          />
          <InfoBox>
            <Text dangerouslySetInnerHTML={{ __html: playlist.description }} />
            <Text>
              {tracklist.length} song{tracklist.length > 1 ? 's' : ''}
            </Text>
            <PlaylistPlayButton
              isPlaying={isActivePlaylist && isPlaying && !isPaused}
              onClick={this.handleButton}
            />
          </InfoBox>
        </DescriptionWrapper>
        <TracksWrapper>
          {tracklist.map(({ track }, i) => {
            return (
              <TrackContainer
                key={track.id}
                artists={track.artists}
                nr={+i}
                track={track}
                playlistId={playlist.id}
                isPlaying={isPlaying && !isPaused}
                isActiveTrack={isActivePlaylist && +i === activeTrackId}
                playTrack={() => startPlay(+i)}
                pauseTrack={() => setPause()}
                unpause={this.props.unpause}
                activeTrackId={isActivePlaylist ? activeTrackId : null}
              />
            );
          })}
        </TracksWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  activePlaylistHref: state.playlist.href,
  activeTrackId: state.activeTrackId,
  currentPlaylistHref: rootUrl + props.history.location.pathname,
  isActivePlaylist:
    state.playlist.href === rootUrl + props.history.location.pathname,
  isPaused: state.isPaused,
  isPlaying: state.isPlaying,
  playlist: state.playlistView,
  tracklist: state.tracklistView,
});

const mapDispatchToProps = (dispatch, getState) => ({
  clearPlaylistView: () => {
    dispatch(actions.clearPlaylistView());
  },
  fetchPlaylistView: href => {
    dispatch(actions.fetchPlaylistView(href));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
  startPlay: track => {
    dispatch(actions.startPlayFromTracklist(track));
  },
  unpause: () => {
    dispatch(actions.unpause());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistView);
