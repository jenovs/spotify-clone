import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import PlaylistDescription from '../../components/PlaylistDescription';
import PlaylistDescriptionWrapper from '../../components/PlaylistDescriptionWrapper';
import PlaylistImage from '../../components/PlaylistImage';
import PlaylistPlayButton from '../../components/PlaylistPlayButton';
import PlaylistTracksWrapper from '../../components/PlaylistTracksWrapper';
import PlaylistWrapper from '../../components/PlaylistWrapper';
import TrackContainer from '../TrackContainer';

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistId: this.props.location.state.id,
      album: this.props.location.state.album,
    };
  }

  componentDidMount() {
    if (!this.state.playlistId || !this.props.token)
      return this.props.history.push('/');

    if (this.state.album) {
      return this.props.fetchAlbumTracks(this.state.playlistId);
    }

    this.props.fetchPlaylist(this.state.playlistId);
  }

  render() {
    console.log('Playlist', this.state.playlistId);
    const {
      isActivePlaylist,
      isPlaying,
      playlistShow,
      setPause,
      startPlaying,
      songInd,
    } = this.props;

    const res = playlistShow;

    if (!res) return <div>Loading...</div>;

    return (
      <PlaylistWrapper>
        <PlaylistDescriptionWrapper>
          <PlaylistImage src={res.images[0].url} alt={res.name} />
          <PlaylistDescription
            name={res.name}
            description={res.description}
            length={res.tracks.items.length}
          >
            <PlaylistPlayButton
              isPlaying={isPlaying}
              isActivePlaylist={isActivePlaylist}
              handlePlay={startPlaying.bind(
                this,
                res.id,
                0,
                isActivePlaylist ? songInd : 0
              )}
              handlePause={setPause}
            />
          </PlaylistDescription>
        </PlaylistDescriptionWrapper>
        <PlaylistTracksWrapper>
          {res.tracks.items.map((item, i) => {
            return (
              <TrackContainer
                key={i}
                nr={i}
                track={item.track}
                isActivePlaylist={isActivePlaylist}
              />
            );
          })}
        </PlaylistTracksWrapper>
      </PlaylistWrapper>
    );
  }
}

const mapStateToProps = state => ({
  playlistShow: state.playlistShow,
  albumPlaylist: state.albumPlaylist,
  isActivePlaylist:
    state.fetchedPlaylistId === (state.playlistShow && state.playlistShow.id),
  isPlaying: state.isPlaying,
  songInd: state.songInd,
  // temp HACK
  // after page reload on non-featured page doesn't redirect to homepage
  token: state.token,
});

const mapDispatchToProps = (dispatch, getState) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
