import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../CoverArt';
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

class CategoryView extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryPlaylist(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearCategoryPlaylist();
  }

  navigate = id => {
    this.props.history.push('/playlist', id);
  };

  render() {
    const { windowWidth } = this.props;
    if (!this.props.playlist) {
      return <div style={{ color: 'lightgray' }}>Loading...</div>;
    }
    return (
      <div style={{ color: 'white' }}>
        <Header>Popular Playlists</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {this.props.playlist.map(p => {
            const icon = p.images[0].url;
            return (
              <CoverArt
                key={p.id}
                {...p}
                icon={icon}
                handleClick={this.navigate}
              />
            );
          })}
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.categoryPlaylist,
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchCategoryPlaylist: id => {
    dispatch(actions.fetchCategoryPlaylist(id));
  },
  clearCategoryPlaylist: () => {
    dispatch(actions.clearCategoryPlaylist());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
