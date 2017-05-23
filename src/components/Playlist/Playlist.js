import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Track from '../Track';

import './Playlist.css';

class Playlist extends Component {

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
    const { res } = this.props;

    if (!res) return <div>Loading...</div>

    return (
        <div className="Playlist__container">
          <div className="Playlist__description-container">
            <div className="Playlist__image-container">
              <img src={res.images[0].url} alt={res.name}/><br/>
            </div>
            <div className="Playlist__description">
              <h2>{res.name}</h2>
              <p>{res.description}</p>
              <p>{res.tracks.items.length} songs</p>
              <div>
                <button>PLAY</button>
              </div>
            </div>
          </div>
          <div className="Playlist__tracks">
            {
              res.tracks.items.map((item, i) => {
                return <Track key={i} nr={i+1} name={item.track.name} />
              })
            }
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  res: state.playlistShow,
  
  // temp HACK
  token: state.token,
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchPlaylist: (id) => {
    dispatch(actions.fetchPlaylist(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
