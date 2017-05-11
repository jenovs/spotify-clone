import React, { Component } from 'react';
// import { Redirect, Route, NavLink } from 'react-router-dom';

import res from '../playlist-response.json';
import Track from '../Track';

import './Playlist.css';

class Playlist extends Component {
  render() {
    console.log('Playlist', this.props.location.state);
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

export default Playlist;
