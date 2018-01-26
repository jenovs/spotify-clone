import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlbumCoverContainer from '../AlbumCoverContainer';

import { CoverWrapper, Wrapper } from './styled';

class FeaturedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: 0,
    };

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

    if (w <= 786 && elements !== 4) this.setState(() => ({ elements: 4 }));
    else if (w < 1200 && w > 786 && elements !== 6)
      this.setState(() => ({ elements: 6 }));
    else if (w < 1500 && w >= 1200 && elements !== 8)
      this.setState(() => ({ elements: 8 }));
    else if (w >= 1500 && elements !== 12)
      this.setState(() => ({ elements: 12 }));
  }

  render() {
    const { featured } = this.props;

    if (!featured) return <div style={{ color: 'white' }}>Loading.....</div>;

    return (
      <Wrapper>
        <h2>{featured.message}</h2>
        <CoverWrapper>
          {featured.playlists.items.map((item, i) => {
            if (i < this.state.elements) {
              return (
                <AlbumCoverContainer
                  key={item.id}
                  playlistId={item.id}
                  image={item.images[0].url}
                  name={item.name}
                  history={this.props.history}
                />
              );
            }
            return null;
          })}
        </CoverWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  featured: state.featured,
});

export default connect(mapStateToProps)(FeaturedContainer);
