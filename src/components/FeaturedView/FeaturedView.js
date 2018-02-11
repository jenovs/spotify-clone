import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  render() {
    const { featured, windowWidth } = this.props;

    if (!featured) return <div style={{ color: 'white' }}>Loading.....</div>;

    return (
      <div>
        <Header>{featured.message}</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {featured.playlists.items.map(item => {
            return (
              <CoverArt
                handleClick={() => {}}
                history={this.props.history}
                icon={item.images[0].url}
                id={item.id}
                key={item.id}
                name={item.name}
                playlistId={item.id}
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
});

export default connect(mapStateToProps)(FeaturedView);
