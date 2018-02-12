import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../../components/CoverArt';
import { Header, Wrapper } from './styled';

const gridTemplateColumns = w => {
  switch (true) {
    case w <= 547:
      return 'repeat(2, 1fr)';
    case w >= 548 && w <= 771:
      return 'repeat(3, 1fr)';
    case w >= 772 && w <= 979:
      return 'repeat(4, 1fr)';
    default:
      return 'repeat(6, 1fr)';
  }
};

class AlbumsView extends Component {
  componentDidMount() {
    this.props.fetchNewReleases();
  }

  handleClick = (id, play, name) => {
    console.log(id, 'play clicked:', play);
    console.log(name);
    this.props.fetchAlbumTracks(id);
    // return this.props.history.push({
    //   pathname: '/playlist',
    //   state: { album: true, id },
    // });
  };

  render() {
    const { items, windowWidth } = this.props;

    if (!items) return <div style={{ color: 'white' }}>Loading.....</div>;

    return (
      <div>
        <Header>New Albums and Singles</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {items.map(item => {
            return (
              <CoverArt
                handleClick={this.handleClick}
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
  items: state.newReleases ? state.newReleases.albums.items : [],
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchNewReleases: () => {
    dispatch(actions.fetchNewReleases());
  },
  fetchAlbumTracks: id => {
    dispatch(actions.fetchAlbumTracks(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsView);
