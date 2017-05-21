import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlbumCover from '../AlbumCover';

import './Featured.css';

class Featured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: 0,
    }

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setElementCount();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setElementCount.bind(this)();
  }

  setElementCount() {
    const w = window.innerWidth;
    const { elements } = this.state;

    if (w <= 786 && elements !== 4) this.setState(() => ({elements: 4}));
    else if (w < 1200 && w > 786 && elements !== 6) this.setState(() => ({elements: 6}));
    else if (w < 1500 && w >= 1200 && elements !== 8) this.setState(() => ({elements: 8}));
    else if (w >= 1500 && elements !== 12) this.setState(() => ({elements: 12}));
  }

  render() {
    const { featured } = this.props;

    if (!featured) return <div style={{color: "white"}}>Loading...</div>

    return (
      <div className="Featured">
        <h2>
          {featured.message}
        </h2>
        <div className="Featured__album-covers">
          {featured.playlists.items.map((item, i) => {
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  featured: state.featured,
});

export default connect(mapStateToProps)(Featured);
