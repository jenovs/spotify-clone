import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import TrackContainer from '../TrackContainer';
import PlaylistPlayButton from '../../components/PlaylistPlayButton';
import PlaylistWrapper from '../../components/PlaylistWrapper';

import './main.css';

class PlaylistContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playlistId: this.props.location.state
    }
  }

  componentDidMount() {
    if (!this.state.playlistId || !this.props.token) return this.props.history.push('/');

    this.props.fetchPlaylist(this.state.playlistId)
  }

  render() {
    console.log('Playlist', this.state.playlistId);
    const {
      res,
      isActivePlaylist,
      isPlaying,
      setPause,
      startPlaying,
      songInd,
    } = this.props;

    if (!res) return <div>Loading...</div>

    return (
        <PlaylistWrapper>
          <div className="Playlist__description-container">
            <div className="Playlist__image-container">
              <img src={res.images[0].url} alt={res.name}/><br/>
            </div>
            <div className="Playlist__description">
              <h2>{res.name}</h2>
              <p>{res.description}</p>
              <p>{res.tracks.items.length} songs</p>
              <PlaylistPlayButton
                isPlaying={isPlaying}
                isActivePlaylist={isActivePlaylist}
                handlePlay={startPlaying.bind(this, res.id, 0, isActivePlaylist ? songInd : 0)}
                handlePause={setPause}
              />
            </div>
          </div>
          <div className="Playlist__tracks">
            {
              res.tracks.items.map((item, i) => {
                return (
                  <TrackContainer
                    key={i}
                    nr={i}
                    track={item.track}
                    isActivePlaylist={isActivePlaylist}
                  />
                )
              })
            }
          </div>
        </PlaylistWrapper>
    )
  }
}

const mapStateToProps = state => ({
  res: state.playlistShow,
  isActivePlaylist: state.fetchedPlaylistId === (state.playlistShow && state.playlistShow.id),
  isPlaying: state.isPlaying,
  songInd: state.songInd,
  // temp HACK
  // after page reload on non-featured page doesn't redirect to homepage
  token: state.token,
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchPlaylist: (id) => {
    dispatch(actions.fetchPlaylist(id));
  },
  startPlaying: (id, playlistId, songInd) => {
    dispatch(actions.startPlaying(id, playlistId, songInd));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
