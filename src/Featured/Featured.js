import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';

import AlbumCover from '../AlbumCover';

import './Featured.css';
import res from '../featured-response.json';

class Featured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res
    }
  }

  render() {
    console.log('Featured, props', this.props);
    const { res } = this.state;
    return (
      <div className="Featured">
        <h2>
          {res.message}
        </h2>
        <div className="Featured__album-covers">
          {res.playlists.items.map((item, i) => {
            if (i < 12) {
              return (
                <AlbumCover
                  key={item.id}
                  playlistId={item.id}
                  image={item.images[0].url}
                  name={item.name}
                  history={this.props.history}
                />
              )
            }
          })}
        </div>
      </div>
    );
  }
}

export default Featured;
