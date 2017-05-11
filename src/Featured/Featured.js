import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';

import AlbumCover from '../AlbumCover';

import './Featured.css';
import res from '../featured-response.json';

class Featured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res,
      elements: 0,
      showAll: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setElementCount();
    });
    this.setElementCount();
  }

  setElementCount() {
    const w = window.innerWidth;
    const { elements } = this.state;

    if (w <= 786 && elements !== 4) this.setState(() => ({elements: 4}));
    else if (w < 1200 && w > 786 && elements !== 6) this.setState(() => ({elements: 6}));
    else if (w < 1500 && w >= 1200 && elements !== 8) this.setState(() => ({elements: 8}));
    else if (w >= 1500 && elements !== 12) this.setState(() => ({elements: 12}));
  }

  showMore() {
    console.log('showMore clicked');
    this.setState(() => ({
      elements: 1000, // magic number :)
      showAll: true,
    }))
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
            if (i < this.state.elements) {
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
            return null;
          })}
        </div>
        {!this.state.showAll &&
          <a
            onClick={this.showMore.bind(this)}
            className="Featured__view-more"
          >SHOW ALL</a>
        }
      </div>
    );
  }
}

export default Featured;
