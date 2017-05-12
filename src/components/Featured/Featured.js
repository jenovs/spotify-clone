import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { getToken } from '../../helpers';

import AlbumCover from '../AlbumCover';

import './Featured.css';
// import res from '../featured-response.json';

class Featured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // res,
      elements: 0,
      showAll: false,
    }

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount called');
    window.addEventListener('resize', this.handleResize);
    this.setElementCount();

    this.fetchFeatured();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setElementCount.bind(this)();
  }

  fetchFeatured() {
    // TODO Add token age check
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    console.log('token', token);
    fetch('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: new Headers({
        Authorization: "Bearer " + token,
      })
    })
    .then(res => res.json())
    .then(json => {
      this.setState(() => ({
        res: json,
      }))
    })
    .catch(err => {
      console.log('>>>>>>Error', err)
      getToken();

      // TODO Temporary solution
      setTimeout(() => {this.fetchFeatured()}, 500)
    });
  }

  setElementCount() {
    const w = window.innerWidth;
    const { elements } = this.state;

    if (elements === 1000) return;

    // if (w <= 786 && elements !== 4) this.setState({elements: 4});
    // else if (w < 1200 && w > 786 && elements !== 6) this.setState({elements: 6});
    // else if (w < 1500 && w >= 1200 && elements !== 8) this.setState({elements: 8});
    // else if (w >= 1500 && elements !== 12) this.setState({elements: 12});
    if (w <= 786 && elements !== 4) this.setState(() => ({elements: 4}));
    else if (w < 1200 && w > 786 && elements !== 6) this.setState(() => ({elements: 6}));
    else if (w < 1500 && w >= 1200 && elements !== 8) this.setState(() => ({elements: 8}));
    else if (w >= 1500 && elements !== 12) this.setState(() => ({elements: 12}));
  }

  showAll() {
    console.log('showAll clicked');
    this.setState(() => ({
      elements: 1000, // magic number :)
      showAll: true,
    }))
  }

  render() {
    console.log('Featured, state', this.state);
    console.log('Featured, props', this.props);
    const { res } = this.state;
    if (!res) return <div style={{color: "white"}}>Loading...</div>
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
                  handlePlay={this.props.handlePlay.bind(null, item.id)}
                />
              )
            }
            return null;
          })}
        </div>
        {!this.state.showAll &&
          <a
            onClick={this.showAll.bind(this)}
            className="Featured__view-more"
          >SHOW ALL</a>
        }
      </div>
    );
  }
}

export default Featured;
