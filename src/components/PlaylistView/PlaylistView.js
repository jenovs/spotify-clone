import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import PlaylistDescription from '../PlaylistDescription';
import PlaylistDescriptionWrapper from '../PlaylistDescriptionWrapper';
import PlaylistImage from '../PlaylistImage';
import PlaylistPlayButton from '../PlaylistPlayButton';
import PlaylistTracksWrapper from '../PlaylistTracksWrapper';
import TrackContainer from '../../containers/TrackContainer';
import { Wrapper } from './styled';

class PlaylistView extends Component {
  constructor(props) {
    super(props);

    const [, type, id] = this.props.history.location.pathname.split('/');
    this.state = {
      playlistId: id,
      type,
    };
  }

  componentDidMount() {
    console.log(this.props);
    // if (!this.props.href) {
    //   this.props.history.push({ pathname: '/' });
    // }
    const { playlistId, type } = this.state;
    if (type === 'album') {
      return this.props.fetchAlbumTracks(playlistId);
    } else if (type === 'playlist') {
      return this.props.fetchPlaylist(playlistId);
    }
  }

  componentWillUnmount() {
    this.props.clearTracklist();
  }

  handlePlay = () => {
    const { playlistId } = this.state;
    const { activeTracklistId, activeTrackId, startPlaying, href } = this.props;
    const isActivePlaylist = activeTracklistId === playlistId;
    const playTrackId = isActivePlaylist ? activeTrackId : 0;

    startPlaying(href, playTrackId);
  };

  render() {
    const {
      activeTracklistId,
      href,
      imgUrl,
      name,
      description,
      isPlaying,
      setPause,
      tracklist,
    } = this.props;

    const isActivePlaylist = activeTracklistId === this.state.playlistId;

    if (!tracklist) return <div>Loading...</div>;

    if (this.props.playlistType !== 'playlist') {
      return <Wrapper>Album playlist is not finished yet :(</Wrapper>;
    }

    console.log(tracklist);

    return (
      <Wrapper>
        <PlaylistDescriptionWrapper>
          <PlaylistImage src={imgUrl} alt={name} />
          <PlaylistDescription
            name={name}
            description={description}
            length={tracklist.length}
          >
            <PlaylistPlayButton
              isPlaying={isPlaying}
              isActivePlaylist={isActivePlaylist}
              handlePlay={this.handlePlay}
              handlePause={setPause}
            />
          </PlaylistDescription>
        </PlaylistDescriptionWrapper>
        <PlaylistTracksWrapper>
          {tracklist.map((item, i) => {
            return (
              <TrackContainer
                key={i}
                // artists={item.track.artists}
                artists={[]}
                nr={i}
                track={item.track || item}
                href={href}
                isActivePlaylist={isActivePlaylist}
                startPlay={this.startPlay}
              />
            );
          })}
        </PlaylistTracksWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  activeTracklistId: state.activeTracklistId,
  activeTrackId: state.activeTrackId,
  description: state.playlistDescription,
  href: state.playlistViewHref,
  imgUrl: state.playlistImageUrl,
  name: state.playlistName,
  isPlaying: state.isPlaying,
  tracklist: state.tracklist,
  playlistType: state.playlistType,
});

const mapDispatchToProps = (dispatch, getState) => ({
  clearTracklist: () => {
    dispatch(actions.clearTracklist());
  },
  fetchPlaylist: id => {
    dispatch(actions.fetchPlaylist(id));
  },
  fetchAlbumTracks: id => {
    dispatch(actions.fetchAlbumTracks(id));
  },
  startPlaying: (id, playlistId, songInd) => {
    dispatch(actions.startPlaying(id, playlistId, songInd));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);
