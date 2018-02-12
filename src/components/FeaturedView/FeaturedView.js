import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../../components/CoverArt';
import { Header, Wrapper } from './styled';

const gridTemplateColumns = w => {
  switch (true) {
    case w <= 547:
      return 'repeat(2, minmax(16px, 246px))';
    case w >= 548 && w <= 771:
      return 'repeat(3, minmax(164px, 239px))';
    case w >= 772 && w <= 979:
      return 'repeat(4, minmax(179px, 231px))';
    default:
      return 'repeat(6, minmax(154px, 240px))';
  }
};

class FeaturedView extends Component {
  handleClick = (id, playClicked) => {
    const { fetchedPlaylistId, isPlaying, startPlaying, setPause } = this.props;

    if (playClicked) {
      if (isPlaying && fetchedPlaylistId === id) {
        return setPause(id);
      } else {
        return startPlaying(id);
      }
    }

    if (this.props.history) {
      return this.props.history.push({ pathname: '/playlist', state: { id } });
    }
  };

  render() {
    const { featured, fetchedPlaylistId, isPlaying, windowWidth } = this.props;

    if (!featured) return <div style={{ color: 'white' }}>Loading.....</div>;

    return (
      <div>
        <Header>{featured.message}</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {featured.playlists.items.map(item => {
            if (!item.images.length) return null;
            return (
              <CoverArt
                key={item.id}
                handleClick={this.handleClick}
                icon={item.images[0].url}
                id={item.id}
                name={item.name}
                showPlayBtn={fetchedPlaylistId === item.id && isPlaying}
              />
            );
          })}
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  featured: state.featured,
  fetchedPlaylistId: state.fetchedPlaylistId,
  isPlaying: state.isPlaying,
});

const mapDispatchToProps = dispatch => ({
  startPlaying: (id, playlistId) => {
    dispatch(actions.startPlaying(id, playlistId));
  },
  setPause: id => {
    dispatch(actions.setPause(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedView);
